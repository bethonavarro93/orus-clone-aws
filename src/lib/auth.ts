import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";
import type { Session, User, DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { generateClient } from "aws-amplify/api";
import type { GraphQLQuery } from "@aws-amplify/api";
import "@/config/aws-config";

interface ListMaestroUsuariosQuery {
  listMaestroUsuarios: {
    items: MaestroUsuario[];
  };
}

const listMaestroUsuarios = /* GraphQL */ `
  query ListMaestroUsuarios($filter: TableMaestroUsuariosFilterInput) {
    listMaestroUsuarios(filter: $filter) {
      items {
        dni
        email
        nombre_completo
        numero_contacto
        fecha_nacimiento
        genero
        contrasena
        foto_perfil
        fecha_creacion
        fecha_actualizacion
        estado
        id_zona_ventas
        canal
        cargo
        gerencia
        sitio
        codigo_cedi
      }
    }
  }
`;

interface MaestroUsuario {
  dni: string;
  email: string;
  nombre_completo: string;
  numero_contacto: string;
  fecha_nacimiento?: string;
  genero?: string;
  contrasena: string;
  foto_perfil?: string;
  fecha_creacion: string;
  fecha_actualizacion?: string;
  estado: boolean;
  id_zona_ventas?: string;
  canal?: string;
  cargo?: string;
  gerencia?: string;
  sitio?: string;
  codigo_cedi?: string;
}

interface CustomSession extends Session {
  user: {
    id: string;
    dni: string;
    email: string;
    nombre_completo: string;
    numero_contacto: string;
    fecha_nacimiento?: string;
    genero?: string;
    foto_perfil?: string;
    fecha_creacion: string;
    fecha_actualizacion?: string;
    estado: boolean;
    id_zona_ventas?: string;
    canal?: string;
    cargo?: string;
    gerencia?: string;
    sitio?: string;
    codigo_cedi?: string;
  } & DefaultSession["user"];
}

interface CustomUser extends User {
  dni: string;
  nombre_completo: string;
  numero_contacto: string;
  fecha_nacimiento?: string;
  genero?: string;
  foto_perfil?: string;
  fecha_creacion: string;
  fecha_actualizacion?: string;
  estado: boolean;
  id_zona_ventas?: string;
  canal?: string;
  cargo?: string;
  gerencia?: string;
  sitio?: string;
  codigo_cedi?: string;
}

async function getUsers(): Promise<MaestroUsuario[]> {
  const client = generateClient();

  try {
    console.log("Iniciando consulta GraphQL...");

    const response = await client.graphql<
      GraphQLQuery<ListMaestroUsuariosQuery>
    >({
      query: listMaestroUsuarios,
      variables: {
        filter: {
          estado: {
            eq: true,
          },
        },
      },
    });

    if (!response.data?.listMaestroUsuarios?.items) {
      console.error("No se encontraron datos de usuarios");
      return [];
    }

    const usuarios = response.data.listMaestroUsuarios.items;
    console.log(`Se encontraron ${usuarios.length} usuarios`);
    return usuarios;
  } catch (error) {
    console.error("Error en getUsers:", error);
    return [];
  }
}

const SESSION_MAXAGE = parseInt(process.env.SESSION_MAXAGE || "180", 10);
const JWT_MAXAGE = SESSION_MAXAGE;

export const config = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "correo@ejemplo.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Tu contraseña",
        },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            console.log("Credenciales incompletas");
            return null;
          }

          const users = await getUsers();
          const user = users.find((u) => u.email === credentials.email);

          if (!user) {
            console.log("Usuario no encontrado:", credentials.email);
            return null;
          }

          if (user.contrasena !== credentials.password) {
            console.log(
              "Contraseña incorrecta para usuario:",
              credentials.email
            );
            return null;
          }

          if (!user.estado) {
            console.log("Usuario inactivo:", credentials.email);
            return null;
          }

          console.log("Autenticación exitosa para:", credentials.email);
          return {
            id: user.dni,
            dni: user.dni,
            email: user.email,
            nombre_completo: user.nombre_completo,
            numero_contacto: user.numero_contacto,
            fecha_nacimiento: user.fecha_nacimiento,
            genero: user.genero,
            foto_perfil: user.foto_perfil,
            fecha_creacion: user.fecha_creacion,
            fecha_actualizacion: user.fecha_actualizacion,
            estado: user.estado,
            id_zona_ventas: user.id_zona_ventas,
            canal: user.canal,
            cargo: user.cargo,
            gerencia: user.gerencia,
            sitio: user.sitio,
            codigo_cedi: user.codigo_cedi,
            emailVerified: null as Date | null,
            name: user.nombre_completo,
          };
        } catch (error) {
          console.error("Error en authorize:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, credentials }) {
      if (!user) {
        console.log("SignIn callback: Usuario no encontrado");
        return false;
      }

      if (credentials) {
        // Validaciones específicas para credenciales
        if (!user.email) {
          console.log("SignIn callback: Email no válido");
          return false;
        }
      }

      console.log("SignIn callback: Autenticación exitosa");
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        const customUser = user as CustomUser;
        token.dni = customUser.dni;
        token.nombre_completo = customUser.nombre_completo;
        token.numero_contacto = customUser.numero_contacto;
        token.fecha_nacimiento = customUser.fecha_nacimiento;
        token.genero = customUser.genero;
        token.foto_perfil = customUser.foto_perfil;
        token.fecha_creacion = customUser.fecha_creacion;
        token.fecha_actualizacion = customUser.fecha_actualizacion;
        token.estado = customUser.estado;
        token.id_zona_ventas = customUser.id_zona_ventas;
        token.canal = customUser.canal;
        token.cargo = customUser.cargo;
        token.gerencia = customUser.gerencia;
        token.sitio = customUser.sitio;
        token.codigo_cedi = customUser.codigo_cedi;
      }
      return token;
    },
    async session({ session, token }): Promise<CustomSession> {
      if (session.user) {
        return {
          ...session,
          user: {
            ...session.user,
            id: token.sub as string,
            dni: token.dni as string,
            email: session.user.email as string,
            nombre_completo: token.nombre_completo as string,
            numero_contacto: token.numero_contacto as string,
            fecha_nacimiento: token.fecha_nacimiento as string | undefined,
            genero: token.genero as string | undefined,
            foto_perfil: token.foto_perfil as string | undefined,
            fecha_creacion: token.fecha_creacion as string,
            fecha_actualizacion: token.fecha_actualizacion as
              | string
              | undefined,
            estado: token.estado as boolean,
            id_zona_ventas: token.id_zona_ventas as string | undefined,
            canal: token.canal as string | undefined,
            cargo: token.cargo as string | undefined,
            gerencia: token.gerencia as string | undefined,
            sitio: token.sitio as string | undefined,
            codigo_cedi: token.codigo_cedi as string | undefined,
          },
        };
      }
      return session as CustomSession;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login", // Cambiado para manejar errores en la página de login
  },
  session: {
    strategy: "jwt",
    maxAge: SESSION_MAXAGE,
  },
  jwt: {
    maxAge: JWT_MAXAGE,
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
export { SESSION_MAXAGE, JWT_MAXAGE };

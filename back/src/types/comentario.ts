import { Static, Type } from "@sinclair/typebox";
export const IdComentario = Type.Object({
  id_comentario: Type.Integer({ description: "Identificador único del usuario" }),
});
export type IdComentario = Static<typeof IdComentario>;

export const ComentarioSchema = Type.Object(
  {
    id_comentario: Type.Integer(),
    id_tema: Type.Integer(),
    id_usuario: Type.Integer(),
    descripcion: Type.String({ description: "Comentario" }),
  },
  {
    examples: [
      {
        id_tema: "Tema al que ingresa el comentario",
        descripcion: "Comentario 1",
      },
      {
        id_tema: "Tema al que ingresa el comentario",
        descripcion: "Comentario 2",
      },
    ],
  }
);
export type Comentario = Static<typeof ComentarioSchema>;

export const NuevoComentarioSchema = Type.Object(
    {
      id_tema: Type.Integer(),
      id_usuario: Type.Integer(),
      descripcion: Type.String({ description: "Comentario" }),
    },
    {
      examples: [
        {
          id_tema: "Tema al que ingresa el comentario",
          descripcion: "Comentario 1",
        },
        {
          id_tema: "Tema al que ingresa el comentario",
          descripcion: "Comentario 2",
        },
      ],
    }
  );

export const ComentarioPut = Type.Pick(ComentarioSchema, ["descripcion"]);
export type ComentarioPut = Static<typeof ComentarioPut>;
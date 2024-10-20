import { FastifyPluginAsync, FastifyPluginOptions } from "fastify";
import * as comentarioService from "../../services/comentarios.js";
import { FastifyInstance } from "fastify/types/instance.js";
import {
  ComentarioSchema,
  NuevoComentario,
  NuevoComentarioSchema,
} from "../../types/comentario.js";

const comentariosRoute: FastifyPluginAsync = async (
  fastify: FastifyInstance,
  opts: FastifyPluginOptions
): Promise<void> => {
  //---------------------------------------------OBTENER COMENTARIOS por ID de tema---------------------------------------------------------------
  fastify.get("/:id_tema", {
    onRequest: [fastify.verifyJWT],
    schema: {
      tags: ["comentario"],
      params: {
        type: "object",
        properties: {
          id_tema: { type: "number" },
        },
        required: ["id_tema"],
      },
    },

    handler: async function (request, reply) {
      const { id_tema } = request.params as { id_tema: number };
      console.log(id_tema);
      const comentarios = comentarioService.findAll(id_tema);
      return comentarios;
    },
  });
  //------------------------------------------------------------------------------------------------------------------------

  //---------------------------------------------CREAR COMENTARIO-----------------------------------------------------------------
  fastify.post("/:id_tema", {
    onRequest: [fastify.verifyJWT],
    schema: {
      tags: ["comentario"],
      params: {
        type: "object",
        properties: {
          id_tema: { type: "number" },
        },
        required: ["id_tema"],
      },
      body: NuevoComentarioSchema,
      summary: "Crear comentario",
      response: {
        201: {
          description: "Comentario creado.",
          content: {
            "application/json": {
              schema: ComentarioSchema,
            },
          },
        },
      },
    },
    handler: async function (request, reply) {
      const nuevoComentario = request.body as NuevoComentario;
      const userId = (request.user as any).id_usuario;
      const { id_tema } = request.params as { id_tema: number };
      return comentarioService.create(
        id_tema,
        userId,
        nuevoComentario.descripcion
      );
    },
  });
  //-----------------------------------------------------------------------------------------------------------------------

  //--------------------------------------------EDITAR COMENTARIO----------------------------------------------------------------
  fastify.put("/:id/:id_comentario", {
    onRequest: [fastify.verifyJWT, fastify.verifyAdmin], //FIXME: No se chequea que sea admin... te lo agrego.
    schema: {
      tags: ["comentario"],
      summary: "Actualizar comentario.",
      params: {
        type: "object",
        properties: {
          id: { type: "number" },
          id_comentario: { type: "number" },
        },
        required: ["id", "id_comentario"],
      },
      body: NuevoComentarioSchema,
      //FIXME: El response está mal validado.
      // response: {
      //   200: {
      //     description: "Comentario actualizado.",
      //     content: {
      //       "application/json": {
      //         schema: ComentarioSchema,
      //       },
      //     },
      //   },
      // },
    },

    handler: async function (request, reply) {
      const comentario = request.body as NuevoComentario;
      const { id, id_comentario } = request.params as {
        id: number;
        id_comentario: number;
      };

      return comentarioService.modify(
        id,
        id_comentario,
        comentario.descripcion
      );
    },
  });
  //------------------------------------------------------------------------------------------------------------------------

  //--------------------------------------------ELIMINAR---------------------------------------------------------------
  fastify.delete("/:id/:id_comentario", {
    onRequest: [fastify.verifyJWT], //FIXME: No se chequea que sea admin o el creador.
    schema: {
      tags: ["comentario"],
      params: {
        type: "object",
        properties: {
          id: { type: "number" },
          id_comentario: { type: "number" },
        },
        required: ["id", "id_comentario"],
      },
      response: {
        "2xx": {
          type: "object",
          properties: {
            mensaje: { type: "string" },
          },
        },
      },
    },

    handler: async function (request, reply) {
      const { id, id_comentario } = request.params as {
        id: number;
        id_comentario: number;
      };
      const borrado = await comentarioService.erase(id, id_comentario);
      console.log({ borrado });
      // if (!borrado) {
      //   return reply.code(204);
      // }
      reply.code(204); //Cuando usas 204 No Contente,  no tiene contenido. Si queres devolver un mensaje, deberías usar 200.
      // return "No ha podido ser borrado" + reply.code(404);
    },
  });
  //-----------------------------------------------------------------------------------------------------------------------
};

export default comentariosRoute;

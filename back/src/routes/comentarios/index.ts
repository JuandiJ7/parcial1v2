import { FastifyPluginAsync, FastifyPluginOptions } from "fastify";
import * as comentarioService from "../../services/comentarios.js";
import { FastifyInstance } from "fastify/types/instance.js";
import { Comentario, ComentarioSchema } from "../../types/comentario.js";

const comentariosRoute: FastifyPluginAsync = async (
    fastify: FastifyInstance,
    opts: FastifyPluginOptions
  ): Promise<void> => {
    //---------------------------------------------OBTENER COMENTARIOS por ID de tarea---------------------------------------------------------------
    fastify.get('/:id',{
        onRequest: [fastify.verifyJWT], 
        schema: {
          tags: ['comentario'],
          params: {
            type: "object",
            properties: {
              id: { type: "number" },
            },
            required: ["id"],
          },
          response: {
            '2xx': {
              type: 'object',
              properties: {
                mensaje: { type: 'string' },
              },
            },
          }
        },
    
        handler: async function (request, reply) {
            const { id_tema } = request.params as { id_tema: number };
            return comentarioService.findAll(id_tema);
        }})
    //------------------------------------------------------------------------------------------------------------------------

    //---------------------------------------------CREAR-----------------------------------------------------------------
    fastify.post('/',{
      onRequest: [fastify.verifyJWT], 
      schema: {
        tags: ['comentario'],
        body: ComentarioSchema,
        summary: "Crear comentario",
        response: {
          '2xx': {
            type: 'object',
            properties: {
              mensaje: { type: 'string' },
            },
          },
        }
      },
  
      handler: async function (request, reply) {
        const nuevoComentario = request.body as Comentario;
        const creacion = comentarioService.create(nuevoComentario.id_tema, nuevoComentario.id_usuario, nuevoComentario.descripcion)
        if((await creacion).length > 0){
            reply.code(201);
            return creacion;
        } else {
            console.error('Error al crear comentario');
            reply.status(500).send({ error: 'Error al crear comentario.' });
        }

      }});
    //-----------------------------------------------------------------------------------------------------------------------

    //--------------------------------------------EDITAR----------------------------------------------------------------
    fastify.put('/:id',{
      onRequest: [fastify.verifyJWT], 
      schema: {
        tags: ['ejemplo'],
        response: {
          '2xx': {
            type: 'object',
            properties: {
              mensaje: { type: 'string' },
            },
          },
        }
      },
  
      handler: async function (request, reply) {
        reply.send({ mensaje: `Ruta no implementada` });
      }})
    //------------------------------------------------------------------------------------------------------------------------    

    //--------------------------------------------ELIMINAR---------------------------------------------------------------
    fastify.delete('/:id',{
      onRequest: [fastify.verifyJWT], 
      schema: {
        tags: ['ejemplo'],
        response: {
          '2xx': {
            type: 'object',
            properties: {
              mensaje: { type: 'string' },
            },
          },
        }
      },
  
      handler: async function (request, reply) {
        reply.send({ mensaje: `Ruta no implementada` });
      }})
    //-----------------------------------------------------------------------------------------------------------------------

  }

  export default comentariosRoute;
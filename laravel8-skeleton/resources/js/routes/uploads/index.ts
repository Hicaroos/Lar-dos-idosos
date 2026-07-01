import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see routes/web.php:32
* @route '/uploads/{path}'
*/
export const serve = (args: { path: string | number } | [path: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: serve.url(args, options),
    method: 'get',
})

serve.definition = {
    methods: ["get","head"],
    url: '/uploads/{path}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:32
* @route '/uploads/{path}'
*/
serve.url = (args: { path: string | number } | [path: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { path: args }
    }

    if (Array.isArray(args)) {
        args = {
            path: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        path: args.path,
    }

    return serve.definition.url
            .replace('{path}', parsedArgs.path.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see routes/web.php:32
* @route '/uploads/{path}'
*/
serve.get = (args: { path: string | number } | [path: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: serve.url(args, options),
    method: 'get',
})

/**
* @see routes/web.php:32
* @route '/uploads/{path}'
*/
serve.head = (args: { path: string | number } | [path: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: serve.url(args, options),
    method: 'head',
})

/**
* @see routes/web.php:32
* @route '/uploads/{path}'
*/
const serveForm = (args: { path: string | number } | [path: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: serve.url(args, options),
    method: 'get',
})

/**
* @see routes/web.php:32
* @route '/uploads/{path}'
*/
serveForm.get = (args: { path: string | number } | [path: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: serve.url(args, options),
    method: 'get',
})

/**
* @see routes/web.php:32
* @route '/uploads/{path}'
*/
serveForm.head = (args: { path: string | number } | [path: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: serve.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

serve.form = serveForm

const uploads = {
    serve: Object.assign(serve, serve),
}

export default uploads
import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\ResidentsController::destroy
* @see app/Http/Controllers/ResidentsController.php:91
* @route '/residents/{resident}/photo'
*/
export const destroy = (args: { resident: string | number | { id: string | number } } | [resident: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/residents/{resident}/photo',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\ResidentsController::destroy
* @see app/Http/Controllers/ResidentsController.php:91
* @route '/residents/{resident}/photo'
*/
destroy.url = (args: { resident: string | number | { id: string | number } } | [resident: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { resident: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { resident: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            resident: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        resident: typeof args.resident === 'object'
        ? args.resident.id
        : args.resident,
    }

    return destroy.definition.url
            .replace('{resident}', parsedArgs.resident.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ResidentsController::destroy
* @see app/Http/Controllers/ResidentsController.php:91
* @route '/residents/{resident}/photo'
*/
destroy.delete = (args: { resident: string | number | { id: string | number } } | [resident: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\ResidentsController::destroy
* @see app/Http/Controllers/ResidentsController.php:91
* @route '/residents/{resident}/photo'
*/
const destroyForm = (args: { resident: string | number | { id: string | number } } | [resident: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ResidentsController::destroy
* @see app/Http/Controllers/ResidentsController.php:91
* @route '/residents/{resident}/photo'
*/
destroyForm.delete = (args: { resident: string | number | { id: string | number } } | [resident: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const photo = {
    destroy: Object.assign(destroy, destroy),
}

export default photo
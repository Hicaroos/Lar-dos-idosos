import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\MedicationsController::index
* @see app/Http/Controllers/MedicationsController.php:12
* @route '/residents/{resident}/medications'
*/
export const index = (args: { resident: string | number | { id: string | number } } | [resident: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/residents/{resident}/medications',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MedicationsController::index
* @see app/Http/Controllers/MedicationsController.php:12
* @route '/residents/{resident}/medications'
*/
index.url = (args: { resident: string | number | { id: string | number } } | [resident: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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

    return index.definition.url
            .replace('{resident}', parsedArgs.resident.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MedicationsController::index
* @see app/Http/Controllers/MedicationsController.php:12
* @route '/residents/{resident}/medications'
*/
index.get = (args: { resident: string | number | { id: string | number } } | [resident: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MedicationsController::index
* @see app/Http/Controllers/MedicationsController.php:12
* @route '/residents/{resident}/medications'
*/
index.head = (args: { resident: string | number | { id: string | number } } | [resident: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\MedicationsController::index
* @see app/Http/Controllers/MedicationsController.php:12
* @route '/residents/{resident}/medications'
*/
const indexForm = (args: { resident: string | number | { id: string | number } } | [resident: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MedicationsController::index
* @see app/Http/Controllers/MedicationsController.php:12
* @route '/residents/{resident}/medications'
*/
indexForm.get = (args: { resident: string | number | { id: string | number } } | [resident: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MedicationsController::index
* @see app/Http/Controllers/MedicationsController.php:12
* @route '/residents/{resident}/medications'
*/
indexForm.head = (args: { resident: string | number | { id: string | number } } | [resident: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index.form = indexForm

/**
* @see \App\Http\Controllers\MedicationsController::create
* @see app/Http/Controllers/MedicationsController.php:0
* @route '/residents/{resident}/medications/create'
*/
export const create = (args: { resident: string | number } | [resident: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(args, options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/residents/{resident}/medications/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MedicationsController::create
* @see app/Http/Controllers/MedicationsController.php:0
* @route '/residents/{resident}/medications/create'
*/
create.url = (args: { resident: string | number } | [resident: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { resident: args }
    }

    if (Array.isArray(args)) {
        args = {
            resident: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        resident: args.resident,
    }

    return create.definition.url
            .replace('{resident}', parsedArgs.resident.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MedicationsController::create
* @see app/Http/Controllers/MedicationsController.php:0
* @route '/residents/{resident}/medications/create'
*/
create.get = (args: { resident: string | number } | [resident: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MedicationsController::create
* @see app/Http/Controllers/MedicationsController.php:0
* @route '/residents/{resident}/medications/create'
*/
create.head = (args: { resident: string | number } | [resident: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\MedicationsController::create
* @see app/Http/Controllers/MedicationsController.php:0
* @route '/residents/{resident}/medications/create'
*/
const createForm = (args: { resident: string | number } | [resident: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MedicationsController::create
* @see app/Http/Controllers/MedicationsController.php:0
* @route '/residents/{resident}/medications/create'
*/
createForm.get = (args: { resident: string | number } | [resident: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MedicationsController::create
* @see app/Http/Controllers/MedicationsController.php:0
* @route '/residents/{resident}/medications/create'
*/
createForm.head = (args: { resident: string | number } | [resident: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

create.form = createForm

/**
* @see \App\Http\Controllers\MedicationsController::store
* @see app/Http/Controllers/MedicationsController.php:19
* @route '/residents/{resident}/medications'
*/
export const store = (args: { resident: string | number | { id: string | number } } | [resident: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/residents/{resident}/medications',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\MedicationsController::store
* @see app/Http/Controllers/MedicationsController.php:19
* @route '/residents/{resident}/medications'
*/
store.url = (args: { resident: string | number | { id: string | number } } | [resident: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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

    return store.definition.url
            .replace('{resident}', parsedArgs.resident.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MedicationsController::store
* @see app/Http/Controllers/MedicationsController.php:19
* @route '/residents/{resident}/medications'
*/
store.post = (args: { resident: string | number | { id: string | number } } | [resident: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\MedicationsController::store
* @see app/Http/Controllers/MedicationsController.php:19
* @route '/residents/{resident}/medications'
*/
const storeForm = (args: { resident: string | number | { id: string | number } } | [resident: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\MedicationsController::store
* @see app/Http/Controllers/MedicationsController.php:19
* @route '/residents/{resident}/medications'
*/
storeForm.post = (args: { resident: string | number | { id: string | number } } | [resident: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(args, options),
    method: 'post',
})

store.form = storeForm

const medications = {
    index: Object.assign(index, index),
    create: Object.assign(create, create),
    store: Object.assign(store, store),
}

export default medications
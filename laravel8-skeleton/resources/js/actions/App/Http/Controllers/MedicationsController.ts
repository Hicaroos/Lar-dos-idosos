import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
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

/**
* @see \App\Http\Controllers\MedicationsController::show
* @see app/Http/Controllers/MedicationsController.php:0
* @route '/medications/{medication}'
*/
export const show = (args: { medication: string | number } | [medication: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/medications/{medication}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MedicationsController::show
* @see app/Http/Controllers/MedicationsController.php:0
* @route '/medications/{medication}'
*/
show.url = (args: { medication: string | number } | [medication: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { medication: args }
    }

    if (Array.isArray(args)) {
        args = {
            medication: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        medication: args.medication,
    }

    return show.definition.url
            .replace('{medication}', parsedArgs.medication.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MedicationsController::show
* @see app/Http/Controllers/MedicationsController.php:0
* @route '/medications/{medication}'
*/
show.get = (args: { medication: string | number } | [medication: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MedicationsController::show
* @see app/Http/Controllers/MedicationsController.php:0
* @route '/medications/{medication}'
*/
show.head = (args: { medication: string | number } | [medication: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\MedicationsController::show
* @see app/Http/Controllers/MedicationsController.php:0
* @route '/medications/{medication}'
*/
const showForm = (args: { medication: string | number } | [medication: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MedicationsController::show
* @see app/Http/Controllers/MedicationsController.php:0
* @route '/medications/{medication}'
*/
showForm.get = (args: { medication: string | number } | [medication: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MedicationsController::show
* @see app/Http/Controllers/MedicationsController.php:0
* @route '/medications/{medication}'
*/
showForm.head = (args: { medication: string | number } | [medication: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show.form = showForm

/**
* @see \App\Http\Controllers\MedicationsController::edit
* @see app/Http/Controllers/MedicationsController.php:0
* @route '/medications/{medication}/edit'
*/
export const edit = (args: { medication: string | number } | [medication: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/medications/{medication}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MedicationsController::edit
* @see app/Http/Controllers/MedicationsController.php:0
* @route '/medications/{medication}/edit'
*/
edit.url = (args: { medication: string | number } | [medication: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { medication: args }
    }

    if (Array.isArray(args)) {
        args = {
            medication: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        medication: args.medication,
    }

    return edit.definition.url
            .replace('{medication}', parsedArgs.medication.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MedicationsController::edit
* @see app/Http/Controllers/MedicationsController.php:0
* @route '/medications/{medication}/edit'
*/
edit.get = (args: { medication: string | number } | [medication: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MedicationsController::edit
* @see app/Http/Controllers/MedicationsController.php:0
* @route '/medications/{medication}/edit'
*/
edit.head = (args: { medication: string | number } | [medication: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\MedicationsController::edit
* @see app/Http/Controllers/MedicationsController.php:0
* @route '/medications/{medication}/edit'
*/
const editForm = (args: { medication: string | number } | [medication: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MedicationsController::edit
* @see app/Http/Controllers/MedicationsController.php:0
* @route '/medications/{medication}/edit'
*/
editForm.get = (args: { medication: string | number } | [medication: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MedicationsController::edit
* @see app/Http/Controllers/MedicationsController.php:0
* @route '/medications/{medication}/edit'
*/
editForm.head = (args: { medication: string | number } | [medication: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

edit.form = editForm

/**
* @see \App\Http\Controllers\MedicationsController::update
* @see app/Http/Controllers/MedicationsController.php:26
* @route '/medications/{medication}'
*/
export const update = (args: { medication: string | number | { id: string | number } } | [medication: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/medications/{medication}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\MedicationsController::update
* @see app/Http/Controllers/MedicationsController.php:26
* @route '/medications/{medication}'
*/
update.url = (args: { medication: string | number | { id: string | number } } | [medication: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { medication: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { medication: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            medication: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        medication: typeof args.medication === 'object'
        ? args.medication.id
        : args.medication,
    }

    return update.definition.url
            .replace('{medication}', parsedArgs.medication.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MedicationsController::update
* @see app/Http/Controllers/MedicationsController.php:26
* @route '/medications/{medication}'
*/
update.put = (args: { medication: string | number | { id: string | number } } | [medication: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\MedicationsController::update
* @see app/Http/Controllers/MedicationsController.php:26
* @route '/medications/{medication}'
*/
update.patch = (args: { medication: string | number | { id: string | number } } | [medication: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\MedicationsController::update
* @see app/Http/Controllers/MedicationsController.php:26
* @route '/medications/{medication}'
*/
const updateForm = (args: { medication: string | number | { id: string | number } } | [medication: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\MedicationsController::update
* @see app/Http/Controllers/MedicationsController.php:26
* @route '/medications/{medication}'
*/
updateForm.put = (args: { medication: string | number | { id: string | number } } | [medication: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\MedicationsController::update
* @see app/Http/Controllers/MedicationsController.php:26
* @route '/medications/{medication}'
*/
updateForm.patch = (args: { medication: string | number | { id: string | number } } | [medication: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

/**
* @see \App\Http\Controllers\MedicationsController::destroy
* @see app/Http/Controllers/MedicationsController.php:33
* @route '/medications/{medication}'
*/
export const destroy = (args: { medication: string | number | { id: string | number } } | [medication: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/medications/{medication}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\MedicationsController::destroy
* @see app/Http/Controllers/MedicationsController.php:33
* @route '/medications/{medication}'
*/
destroy.url = (args: { medication: string | number | { id: string | number } } | [medication: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { medication: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { medication: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            medication: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        medication: typeof args.medication === 'object'
        ? args.medication.id
        : args.medication,
    }

    return destroy.definition.url
            .replace('{medication}', parsedArgs.medication.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MedicationsController::destroy
* @see app/Http/Controllers/MedicationsController.php:33
* @route '/medications/{medication}'
*/
destroy.delete = (args: { medication: string | number | { id: string | number } } | [medication: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\MedicationsController::destroy
* @see app/Http/Controllers/MedicationsController.php:33
* @route '/medications/{medication}'
*/
const destroyForm = (args: { medication: string | number | { id: string | number } } | [medication: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\MedicationsController::destroy
* @see app/Http/Controllers/MedicationsController.php:33
* @route '/medications/{medication}'
*/
destroyForm.delete = (args: { medication: string | number | { id: string | number } } | [medication: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const MedicationsController = { index, create, store, show, edit, update, destroy }

export default MedicationsController
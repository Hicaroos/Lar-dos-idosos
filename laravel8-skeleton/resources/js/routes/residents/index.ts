import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
import photo from './photo'
import medications from './medications'
/**
* @see \App\Http\Controllers\ResidentsController::restore
* @see app/Http/Controllers/ResidentsController.php:77
* @route '/residents/{resident}/restore'
*/
export const restore = (args: { resident: string | number | { id: string | number } } | [resident: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: restore.url(args, options),
    method: 'post',
})

restore.definition = {
    methods: ["post"],
    url: '/residents/{resident}/restore',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ResidentsController::restore
* @see app/Http/Controllers/ResidentsController.php:77
* @route '/residents/{resident}/restore'
*/
restore.url = (args: { resident: string | number | { id: string | number } } | [resident: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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

    return restore.definition.url
            .replace('{resident}', parsedArgs.resident.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ResidentsController::restore
* @see app/Http/Controllers/ResidentsController.php:77
* @route '/residents/{resident}/restore'
*/
restore.post = (args: { resident: string | number | { id: string | number } } | [resident: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: restore.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ResidentsController::restore
* @see app/Http/Controllers/ResidentsController.php:77
* @route '/residents/{resident}/restore'
*/
const restoreForm = (args: { resident: string | number | { id: string | number } } | [resident: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: restore.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ResidentsController::restore
* @see app/Http/Controllers/ResidentsController.php:77
* @route '/residents/{resident}/restore'
*/
restoreForm.post = (args: { resident: string | number | { id: string | number } } | [resident: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: restore.url(args, options),
    method: 'post',
})

restore.form = restoreForm

/**
* @see \App\Http\Controllers\ResidentsController::forceDelete
* @see app/Http/Controllers/ResidentsController.php:84
* @route '/residents/{resident}/force'
*/
export const forceDelete = (args: { resident: string | number | { id: string | number } } | [resident: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: forceDelete.url(args, options),
    method: 'delete',
})

forceDelete.definition = {
    methods: ["delete"],
    url: '/residents/{resident}/force',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\ResidentsController::forceDelete
* @see app/Http/Controllers/ResidentsController.php:84
* @route '/residents/{resident}/force'
*/
forceDelete.url = (args: { resident: string | number | { id: string | number } } | [resident: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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

    return forceDelete.definition.url
            .replace('{resident}', parsedArgs.resident.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ResidentsController::forceDelete
* @see app/Http/Controllers/ResidentsController.php:84
* @route '/residents/{resident}/force'
*/
forceDelete.delete = (args: { resident: string | number | { id: string | number } } | [resident: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: forceDelete.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\ResidentsController::forceDelete
* @see app/Http/Controllers/ResidentsController.php:84
* @route '/residents/{resident}/force'
*/
const forceDeleteForm = (args: { resident: string | number | { id: string | number } } | [resident: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: forceDelete.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ResidentsController::forceDelete
* @see app/Http/Controllers/ResidentsController.php:84
* @route '/residents/{resident}/force'
*/
forceDeleteForm.delete = (args: { resident: string | number | { id: string | number } } | [resident: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: forceDelete.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

forceDelete.form = forceDeleteForm

/**
* @see \App\Http\Controllers\ResidentsController::index
* @see app/Http/Controllers/ResidentsController.php:18
* @route '/residents'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/residents',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ResidentsController::index
* @see app/Http/Controllers/ResidentsController.php:18
* @route '/residents'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ResidentsController::index
* @see app/Http/Controllers/ResidentsController.php:18
* @route '/residents'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ResidentsController::index
* @see app/Http/Controllers/ResidentsController.php:18
* @route '/residents'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ResidentsController::index
* @see app/Http/Controllers/ResidentsController.php:18
* @route '/residents'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ResidentsController::index
* @see app/Http/Controllers/ResidentsController.php:18
* @route '/residents'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ResidentsController::index
* @see app/Http/Controllers/ResidentsController.php:18
* @route '/residents'
*/
indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index.form = indexForm

/**
* @see \App\Http\Controllers\ResidentsController::create
* @see app/Http/Controllers/ResidentsController.php:29
* @route '/residents/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/residents/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ResidentsController::create
* @see app/Http/Controllers/ResidentsController.php:29
* @route '/residents/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ResidentsController::create
* @see app/Http/Controllers/ResidentsController.php:29
* @route '/residents/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ResidentsController::create
* @see app/Http/Controllers/ResidentsController.php:29
* @route '/residents/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ResidentsController::create
* @see app/Http/Controllers/ResidentsController.php:29
* @route '/residents/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ResidentsController::create
* @see app/Http/Controllers/ResidentsController.php:29
* @route '/residents/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ResidentsController::create
* @see app/Http/Controllers/ResidentsController.php:29
* @route '/residents/create'
*/
createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

create.form = createForm

/**
* @see \App\Http\Controllers\ResidentsController::store
* @see app/Http/Controllers/ResidentsController.php:34
* @route '/residents'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/residents',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ResidentsController::store
* @see app/Http/Controllers/ResidentsController.php:34
* @route '/residents'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ResidentsController::store
* @see app/Http/Controllers/ResidentsController.php:34
* @route '/residents'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ResidentsController::store
* @see app/Http/Controllers/ResidentsController.php:34
* @route '/residents'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ResidentsController::store
* @see app/Http/Controllers/ResidentsController.php:34
* @route '/residents'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\ResidentsController::show
* @see app/Http/Controllers/ResidentsController.php:41
* @route '/residents/{resident}'
*/
export const show = (args: { resident: string | number | { id: string | number } } | [resident: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/residents/{resident}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ResidentsController::show
* @see app/Http/Controllers/ResidentsController.php:41
* @route '/residents/{resident}'
*/
show.url = (args: { resident: string | number | { id: string | number } } | [resident: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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

    return show.definition.url
            .replace('{resident}', parsedArgs.resident.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ResidentsController::show
* @see app/Http/Controllers/ResidentsController.php:41
* @route '/residents/{resident}'
*/
show.get = (args: { resident: string | number | { id: string | number } } | [resident: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ResidentsController::show
* @see app/Http/Controllers/ResidentsController.php:41
* @route '/residents/{resident}'
*/
show.head = (args: { resident: string | number | { id: string | number } } | [resident: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ResidentsController::show
* @see app/Http/Controllers/ResidentsController.php:41
* @route '/residents/{resident}'
*/
const showForm = (args: { resident: string | number | { id: string | number } } | [resident: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ResidentsController::show
* @see app/Http/Controllers/ResidentsController.php:41
* @route '/residents/{resident}'
*/
showForm.get = (args: { resident: string | number | { id: string | number } } | [resident: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ResidentsController::show
* @see app/Http/Controllers/ResidentsController.php:41
* @route '/residents/{resident}'
*/
showForm.head = (args: { resident: string | number | { id: string | number } } | [resident: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\ResidentsController::edit
* @see app/Http/Controllers/ResidentsController.php:53
* @route '/residents/{resident}/edit'
*/
export const edit = (args: { resident: string | number | { id: string | number } } | [resident: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/residents/{resident}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ResidentsController::edit
* @see app/Http/Controllers/ResidentsController.php:53
* @route '/residents/{resident}/edit'
*/
edit.url = (args: { resident: string | number | { id: string | number } } | [resident: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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

    return edit.definition.url
            .replace('{resident}', parsedArgs.resident.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ResidentsController::edit
* @see app/Http/Controllers/ResidentsController.php:53
* @route '/residents/{resident}/edit'
*/
edit.get = (args: { resident: string | number | { id: string | number } } | [resident: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ResidentsController::edit
* @see app/Http/Controllers/ResidentsController.php:53
* @route '/residents/{resident}/edit'
*/
edit.head = (args: { resident: string | number | { id: string | number } } | [resident: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ResidentsController::edit
* @see app/Http/Controllers/ResidentsController.php:53
* @route '/residents/{resident}/edit'
*/
const editForm = (args: { resident: string | number | { id: string | number } } | [resident: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ResidentsController::edit
* @see app/Http/Controllers/ResidentsController.php:53
* @route '/residents/{resident}/edit'
*/
editForm.get = (args: { resident: string | number | { id: string | number } } | [resident: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ResidentsController::edit
* @see app/Http/Controllers/ResidentsController.php:53
* @route '/residents/{resident}/edit'
*/
editForm.head = (args: { resident: string | number | { id: string | number } } | [resident: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\ResidentsController::update
* @see app/Http/Controllers/ResidentsController.php:63
* @route '/residents/{resident}'
*/
export const update = (args: { resident: string | number | { id: string | number } } | [resident: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/residents/{resident}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\ResidentsController::update
* @see app/Http/Controllers/ResidentsController.php:63
* @route '/residents/{resident}'
*/
update.url = (args: { resident: string | number | { id: string | number } } | [resident: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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

    return update.definition.url
            .replace('{resident}', parsedArgs.resident.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ResidentsController::update
* @see app/Http/Controllers/ResidentsController.php:63
* @route '/residents/{resident}'
*/
update.put = (args: { resident: string | number | { id: string | number } } | [resident: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\ResidentsController::update
* @see app/Http/Controllers/ResidentsController.php:63
* @route '/residents/{resident}'
*/
update.patch = (args: { resident: string | number | { id: string | number } } | [resident: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\ResidentsController::update
* @see app/Http/Controllers/ResidentsController.php:63
* @route '/residents/{resident}'
*/
const updateForm = (args: { resident: string | number | { id: string | number } } | [resident: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ResidentsController::update
* @see app/Http/Controllers/ResidentsController.php:63
* @route '/residents/{resident}'
*/
updateForm.put = (args: { resident: string | number | { id: string | number } } | [resident: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ResidentsController::update
* @see app/Http/Controllers/ResidentsController.php:63
* @route '/residents/{resident}'
*/
updateForm.patch = (args: { resident: string | number | { id: string | number } } | [resident: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\ResidentsController::destroy
* @see app/Http/Controllers/ResidentsController.php:70
* @route '/residents/{resident}'
*/
export const destroy = (args: { resident: string | number | { id: string | number } } | [resident: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/residents/{resident}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\ResidentsController::destroy
* @see app/Http/Controllers/ResidentsController.php:70
* @route '/residents/{resident}'
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
* @see app/Http/Controllers/ResidentsController.php:70
* @route '/residents/{resident}'
*/
destroy.delete = (args: { resident: string | number | { id: string | number } } | [resident: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\ResidentsController::destroy
* @see app/Http/Controllers/ResidentsController.php:70
* @route '/residents/{resident}'
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
* @see app/Http/Controllers/ResidentsController.php:70
* @route '/residents/{resident}'
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

const residents = {
    restore: Object.assign(restore, restore),
    forceDelete: Object.assign(forceDelete, forceDelete),
    photo: Object.assign(photo, photo),
    index: Object.assign(index, index),
    create: Object.assign(create, create),
    store: Object.assign(store, store),
    show: Object.assign(show, show),
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
    medications: Object.assign(medications, medications),
}

export default residents
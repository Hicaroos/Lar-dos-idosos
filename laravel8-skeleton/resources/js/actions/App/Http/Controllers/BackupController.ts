import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\BackupController::__invoke
* @see app/Http/Controllers/BackupController.php:10
* @route '/backup'
*/
const BackupController = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: BackupController.url(options),
    method: 'get',
})

BackupController.definition = {
    methods: ["get","head"],
    url: '/backup',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\BackupController::__invoke
* @see app/Http/Controllers/BackupController.php:10
* @route '/backup'
*/
BackupController.url = (options?: RouteQueryOptions) => {
    return BackupController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\BackupController::__invoke
* @see app/Http/Controllers/BackupController.php:10
* @route '/backup'
*/
BackupController.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: BackupController.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\BackupController::__invoke
* @see app/Http/Controllers/BackupController.php:10
* @route '/backup'
*/
BackupController.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: BackupController.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\BackupController::__invoke
* @see app/Http/Controllers/BackupController.php:10
* @route '/backup'
*/
const BackupControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: BackupController.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\BackupController::__invoke
* @see app/Http/Controllers/BackupController.php:10
* @route '/backup'
*/
BackupControllerForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: BackupController.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\BackupController::__invoke
* @see app/Http/Controllers/BackupController.php:10
* @route '/backup'
*/
BackupControllerForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: BackupController.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

BackupController.form = BackupControllerForm

export default BackupController
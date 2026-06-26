<?php

namespace App\Http\Controllers;

use App\Services\ReportsService;
use Inertia\Inertia;
use Inertia\Response;

class ReportsController extends Controller
{
    public function __construct(public ReportsService $reportsService)
    {
    }

    public function index(): Response
    {
        $reportsData = $this->reportsService->getReportsData();

        return Inertia::render('Reports/Index', $reportsData);
    }
}

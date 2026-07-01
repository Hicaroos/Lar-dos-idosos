<?php

namespace App\Http\Controllers;

use App\Services\ReportsService;
use Inertia\Inertia;
use Inertia\Response;

class ReportsController extends Controller
{
    protected ReportsService $reportsService;

    public function __construct(ReportsService $reportsService)
    {
        $this->reportsService = $reportsService;
    }

    public function index(): Response
    {
        $reportsData = $this->reportsService->getReportsData();

        return Inertia::render('Reports/Index', $reportsData);
    }
}

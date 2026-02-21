<?php

namespace App\Http\Controllers\Marketing;

use App\Http\Controllers\Controller;
use Illuminate\Http\Response;

class SitemapController extends Controller
{
    public function index(): Response
    {
        $pages = [
            ['url' => '/', 'priority' => '1.0', 'changefreq' => 'weekly'],
            ['url' => '/features', 'priority' => '0.8', 'changefreq' => 'monthly'],
            ['url' => '/pricing', 'priority' => '0.8', 'changefreq' => 'monthly'],
            ['url' => '/about', 'priority' => '0.8', 'changefreq' => 'monthly'],
            ['url' => '/contact', 'priority' => '0.8', 'changefreq' => 'monthly'],
            ['url' => '/blog', 'priority' => '0.8', 'changefreq' => 'weekly'],
            ['url' => '/privacy', 'priority' => '0.5', 'changefreq' => 'yearly'],
            ['url' => '/terms', 'priority' => '0.5', 'changefreq' => 'yearly'],
            ['url' => '/security', 'priority' => '0.5', 'changefreq' => 'yearly'],
        ];

        $baseUrl = config('app.url');

        $xml = '<?xml version="1.0" encoding="UTF-8"?>'."\n";
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'."\n";

        foreach ($pages as $page) {
            $xml .= '  <url>'."\n";
            $xml .= '    <loc>'.htmlspecialchars($baseUrl.$page['url']).'</loc>'."\n";
            $xml .= '    <changefreq>'.$page['changefreq'].'</changefreq>'."\n";
            $xml .= '    <priority>'.$page['priority'].'</priority>'."\n";
            $xml .= '  </url>'."\n";
        }

        $xml .= '</urlset>';

        return response($xml, 200)->header('Content-Type', 'application/xml');
    }

    public function robots(): Response
    {
        $baseUrl = config('app.url');

        $content = "User-agent: *\n";
        $content .= "Allow: /\n";
        $content .= "Disallow: /api/\n";
        $content .= "Disallow: /admin/\n";
        $content .= "Sitemap: {$baseUrl}/sitemap.xml\n";

        return response($content, 200)->header('Content-Type', 'text/plain');
    }
}

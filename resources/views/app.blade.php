<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" dir="{{ app()->getLocale() === 'ar' ? 'rtl' : 'ltr' }}">

<head>
    <!-- Google Tag Manager -->
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-NT2M2VRC');</script>
    <!-- End Google Tag Manager -->

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5">
    <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <!-- SEO Core Meta & Comprehensive Multilingual Keywords Matrix -->
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
    <meta name="author" content="مركز بدر لطب الأسنان | Badr Dental Center">
    <meta name="publisher" content="مركز بدر لعلاج وتجميل وزراعة الأسنان">
    <meta name="application-name" content="مركز بدر للأسنان">
    <meta name="keywords" content="دكتور أسنان, عيادة أسنان, مركز أسنان, العناية بالأسنان, أفضل دكتور أسنان, أفضل عيادة أسنان, خدمات طب الأسنان, استشارة طبيب أسنان, دكتور أسنان للطوارئ, الكشف على الأسنان, علاج الأسنان, أخصائي أسنان, زراعة الأسنان, تبييض الأسنان, تقويم الأسنان, تجميل الأسنان, علاج عصب الأسنان, خلع الأسنان, حشو الأسنان, تيجان الأسنان, جسور الأسنان, فينير الأسنان, هوليود سمايل, علاج اللثة, طب أسنان الأطفال, خلع ضرس العقل, أطقم الأسنان, التقويم الشفاف, تنظيف الأسنان, تلميع الأسنان, علاج ألم الأسنان, دكتور أسنان قريب مني, عيادة أسنان قريبة مني, مركز أسنان قريب مني, دكتور أسنان في القاهرة, عيادة أسنان في القاهرة, دكتور أسنان في المنصورة, دكتور أسنان في الشيخ زايد, زراعة الأسنان في القاهرة, دكتور تقويم أسنان في القاهرة, تبييض الأسنان في القاهرة, عيادة أسنان مفتوحة الآن, دكتور تجميل أسنان, دكتور زراعة أسنان, أخصائي تقويم الأسنان, حجز موعد دكتور أسنان, استشارة دكتور أسنان, احجز موعد مع دكتور أسنان, حجز عيادة أسنان, حجز استشارة زراعة الأسنان, حجز موعد تبييض الأسنان, أسعار علاج الأسنان, أسعار زراعة الأسنان, أسعار تقويم الأسنان, أسعار تبييض الأسنان, رقم عيادة الأسنان, كم تكلفة زراعة الأسنان, كم تستغرق مدة تقويم الأسنان, هل تبييض الأسنان آمن, Dentist, Dental clinic, Dental center, Dental care, Best dentist, Best dental clinic, Dental services, Family dentist, Private dentist, Dental consultation, Emergency dentist, Dental checkup, Dental treatment, Dental specialist, Dental implants, Teeth whitening, Orthodontics, Braces, Cosmetic dentistry, Root canal treatment, Tooth extraction, Dental fillings, Dental crowns, Dental bridges, Dental veneers, Hollywood smile, Gum treatment, Pediatric dentistry, Wisdom tooth removal, Dentures, Clear aligners, Dental cleaning, Teeth polishing, Toothache treatment, Dentist near me, Dental clinic near me, Dental center near me, Dentist in Cairo, Dental clinic in Cairo, Dentist in Alexandria, Dentist in Mansoura, Dentist in Sheikh Zayed, Dental implants in Cairo, Orthodontist in Cairo, Teeth whitening in Cairo, Dental clinic open now, Affordable dentist near me, Experienced dentist, Cosmetic dentist, Implant dentist, Dentist appointment, Dentist consultation, Book a dentist appointment, Dental clinic booking, Dental implant consultation, Teeth whitening appointment, Orthodontic consultation, Dental treatment prices, Dental implants prices, Braces prices, Teeth whitening prices, Dental clinic contact number, Badr Dental Center">
    
    <!-- Geo Meta Tags (Local SEO for Mansoura & Sheikh Zayed & Egypt) -->
    <meta name="geo.region" content="EG-DK, EG-GZ">
    <meta name="geo.placename" content="Mansoura, Sheikh Zayed, Giza, Cairo, Egypt">
    <meta name="geo.position" content="31.0409;31.3785">
    <meta name="ICBM" content="31.0409, 31.3785">

    <!-- Canonical & Multilingual Hreflang Tags -->
    @php
        $primaryDomain = 'https://badrdentalcenter.com';
        $currentPath = request()->path() === '/' ? '' : '/' . ltrim(request()->path(), '/');
        $canonicalUrl = $primaryDomain . $currentPath;

        $schemaData = [
            '@context' => 'https://schema.org',
            '@graph' => [
                [
                    '@type' => ['Dentist', 'MedicalBusiness', 'LocalBusiness'],
                    '@id' => $primaryDomain . '/#organization',
                    'name' => 'مركز بدر لعلاج وتجميل وزراعة وتقويم الأسنان',
                    'alternateName' => [
                        'Badr Dental Center',
                        'مركز بدر لطب الأسنان',
                        'عيادات دكتور أحمد بدر للأسنان'
                    ],
                    'url' => $primaryDomain,
                    'logo' => [
                        '@type' => 'ImageObject',
                        'url' => $primaryDomain . '/current-logo.png',
                        'width' => '300',
                        'height' => '100'
                    ],
                    'image' => $primaryDomain . '/og-image.png',
                    'description' => 'مركز بدر لعلاج وتجميل وزراعة وتقويم الأسنان بالمنصورة والشيخ زايد بمصر. نخبة تضم أكثر من 30 استشاري وأخصائي في زراعة الأسنان الفورية، هوليوود سمايل، تقويم الأسنان، علاج العصب بدون ألم بجلسة واحدة، وتخدير كلي مريح. متاح أنظمة تقسيط ميسرة.',
                    'priceRange' => '$$',
                    'telephone' => ['+201060000805', '+201030000728'],
                    'email' => 'info@badrdentalcenter.com',
                    'foundingDate' => '2014',
                    'currenciesAccepted' => 'EGP, USD, SAR, AED',
                    'paymentAccepted' => 'Cash, Credit Card, Installments',
                    'aggregateRating' => [
                        '@type' => 'AggregateRating',
                        'ratingValue' => '4.9',
                        'bestRating' => '5',
                        'ratingCount' => '1480'
                    ],
                    'areaServed' => [
                        'Mansoura',
                        'Sheikh Zayed',
                        'Cairo',
                        'Giza',
                        '6th of October',
                        'Alexandria',
                        'Egypt',
                        'Saudi Arabia',
                        'United Arab Emirates',
                        'Kuwait'
                    ],
                    'medicalSpecialty' => [
                        'Dentistry',
                        'Orthodontics',
                        'Oral Surgery',
                        'Cosmetic Dentistry',
                        'Implantology',
                        'Pediatric Dentistry',
                        'Endodontics',
                        'Periodontics'
                    ],
                    'availableService' => [
                        ['@type' => 'MedicalProcedure', 'name' => 'زراعة الأسنان (Dental Implants)'],
                        ['@type' => 'MedicalProcedure', 'name' => 'تبييض الأسنان (Teeth Whitening)'],
                        ['@type' => 'MedicalProcedure', 'name' => 'تقويم الأسنان (Orthodontics & Braces)'],
                        ['@type' => 'MedicalProcedure', 'name' => 'التقويم الشفاف (Clear Aligners)'],
                        ['@type' => 'MedicalProcedure', 'name' => 'تجميل الأسنان (Cosmetic Dentistry)'],
                        ['@type' => 'MedicalProcedure', 'name' => 'فينير الأسنان (Dental Veneers)'],
                        ['@type' => 'MedicalProcedure', 'name' => 'هوليود سمايل (Hollywood Smile)'],
                        ['@type' => 'MedicalProcedure', 'name' => 'علاج عصب الأسنان (Root Canal Treatment)'],
                        ['@type' => 'MedicalProcedure', 'name' => 'حشو الأسنان (Dental Fillings)'],
                        ['@type' => 'MedicalProcedure', 'name' => 'تيجان وجسور الأسنان (Dental Crowns & Bridges)'],
                        ['@type' => 'MedicalProcedure', 'name' => 'خلع الأسنان وخلع ضرس العقل (Tooth & Wisdom Tooth Extraction)'],
                        ['@type' => 'MedicalProcedure', 'name' => 'علاج اللثة (Gum Treatment)'],
                        ['@type' => 'MedicalProcedure', 'name' => 'طب أسنان الأطفال (Pediatric Dentistry)'],
                        ['@type' => 'MedicalProcedure', 'name' => 'أطقم الأسنان (Dentures)'],
                        ['@type' => 'MedicalProcedure', 'name' => 'تنظيف وتلميع الأسنان (Dental Cleaning & Teeth Polishing)'],
                        ['@type' => 'MedicalProcedure', 'name' => 'علاج ألم الأسنان (Toothache Treatment)']
                    ],
                    'department' => [
                        [
                            '@type' => 'Dentist',
                            'name' => 'مركز بدر للأسنان — فرع المنصورة',
                            'telephone' => '+201060000805',
                            'hasMap' => 'https://maps.app.goo.gl/HzMFLXHveNFaMsi37',
                            'address' => [
                                '@type' => 'PostalAddress',
                                'streetAddress' => 'حي الجامعة، أمام بوابة توشكى',
                                'addressLocality' => 'المنصورة',
                                'addressRegion' => 'الدقهلية',
                                'addressCountry' => 'EG'
                            ],
                            'geo' => [
                                '@type' => 'GeoCoordinates',
                                'latitude' => 31.0409,
                                'longitude' => 31.3785
                            ],
                            'openingHoursSpecification' => [
                                [
                                    '@type' => 'OpeningHoursSpecification',
                                    'dayOfWeek' => ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                                    'opens' => '10:00',
                                    'closes' => '23:00'
                                ]
                            ]
                        ],
                        [
                            '@type' => 'Dentist',
                            'name' => 'مركز بدر للأسنان — فرع الشيخ زايد',
                            'telephone' => '+201030000728',
                            'hasMap' => 'https://maps.app.goo.gl/hnnERt4HpXiUg87z5',
                            'address' => [
                                '@type' => 'PostalAddress',
                                'streetAddress' => 'الشيخ زايد، وصلة دهشور',
                                'addressLocality' => 'الشيخ زايد',
                                'addressRegion' => 'الجيزة',
                                'addressCountry' => 'EG'
                            ],
                            'geo' => [
                                '@type' => 'GeoCoordinates',
                                'latitude' => 30.0566,
                                'longitude' => 30.9856
                            ],
                            'openingHoursSpecification' => [
                                [
                                    '@type' => 'OpeningHoursSpecification',
                                    'dayOfWeek' => ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                                    'opens' => '10:00',
                                    'closes' => '23:00'
                                ]
                            ]
                        ]
                    ],
                    'sameAs' => [
                        'https://www.facebook.com/badrdentalcenter',
                        'https://www.instagram.com/badrdentalcenter',
                        'https://www.tiktok.com/@badrdentalcenter',
                        'https://www.youtube.com/@badrdentalcenter'
                    ]
                ],
                [
                    '@type' => 'Physician',
                    '@id' => $primaryDomain . '/#dr-ahmed-badr',
                    'name' => 'د. أحمد بدر',
                    'alternateName' => 'Dr. Ahmed Badr',
                    'jobTitle' => 'استشاري جراحة وزراعة وتجميل الأسنان',
                    'worksFor' => [
                        '@id' => $primaryDomain . '/#organization'
                    ],
                    'medicalSpecialty' => [
                        'Implantology',
                        'Oral and Maxillofacial Surgery',
                        'Cosmetic Dentistry'
                    ],
                    'description' => 'استشاري جراحة وزراعة وتجميل الأسنان، مؤسس مركز بدر لطب الأسنان، رائد تقنيات الزراعة الفورية وتصميم الابتسامة الرقمية ثلاثية الأبعاد في مصر.'
                ],
                [
                    '@type' => 'WebSite',
                    '@id' => $primaryDomain . '/#website',
                    'url' => $primaryDomain,
                    'name' => 'مركز بدر لطب الأسنان',
                    'alternateName' => 'Badr Dental Center',
                    'publisher' => [
                        '@id' => $primaryDomain . '/#organization'
                    ],
                    'inLanguage' => ['ar', 'en'],
                    'potentialAction' => [
                        '@type' => 'SearchAction',
                        'target' => $primaryDomain . '/articles?search={search_term_string}',
                        'query-input' => 'required name=search_term_string'
                    ]
                ]
            ]
        ];
    @endphp
    <link rel="canonical" href="{{ $canonicalUrl }}">
    <link rel="alternate" hreflang="ar" href="{{ $canonicalUrl }}">
    <link rel="alternate" hreflang="en" href="{{ $canonicalUrl }}">
    <link rel="alternate" hreflang="x-default" href="{{ $canonicalUrl }}">

    <!-- Open Graph & Social Cards -->
    <meta property="og:site_name" content="مركز بدر لطب الأسنان | Badr Dental Center">
    <meta property="og:type" content="website">
    <meta property="og:locale" content="{{ app()->getLocale() === 'ar' ? 'ar_EG' : 'en_US' }}">
    <meta property="og:locale:alternate" content="{{ app()->getLocale() === 'ar' ? 'en_US' : 'ar_EG' }}">
    <meta property="og:image" content="{{ $primaryDomain }}/og-image.png">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:image:alt" content="مركز بدر لطب الأسنان - المنصورة والشيخ زايد">

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="@badrdentalcenter">
    <meta name="twitter:creator" content="@badrdentalcenter">
    <meta name="twitter:image" content="{{ $primaryDomain }}/og-image.png">

    <!-- Mobile Theme Color -->
    <meta name="theme-color" content="#09090b">
    <meta name="msapplication-navbutton-color" content="#09090b">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">

    <!-- Favicon & App Icons -->
    <link rel="icon" href="/current-logo.png" sizes="any">
    <link rel="icon" href="/current-logo.png" type="image/png">
    <link rel="apple-touch-icon" href="/current-logo.png">

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

    {{-- Universal Schema.org JSON-LD for Crawlers (MedicalBusiness, Dentist, Physician, WebSite) --}}
    <script type="application/ld+json">
    {!! json_encode($schemaData, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT) !!}
    </script>

    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.tsx'])
    @inertiaHead
</head>

<body class="font-sans antialiased">
    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NT2M2VRC"
    height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->
    <x-inertia::app />
</body>

</html>
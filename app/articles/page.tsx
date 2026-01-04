import { getArticlesData, getSiteIdentity, getContactData } from "@/lib/api"; 
import Navigation from "@/components/layout/navigation"; 
import Footer from "@/components/layout/footer";
import ArticlesFeed from "@/components/pages/articles-feed";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

function determineEntity(refParam: string | undefined): "pasraman" | "yayasan" | "pura" {
    if (refParam === 'pasraman') return 'pasraman';
    if (refParam === 'yayasan') return 'yayasan';
    if (refParam === 'pura') return 'pura';
    return "pura"; 
}

export const metadata = {
    title: 'Berita & Artikel | Pura Agung Kertajaya',
    description: 'Kumpulan berita dan artikel terbaru.',
}

export default async function ArticlesPage({ searchParams }: Props) {
  const { ref } = await searchParams;
  const refString = Array.isArray(ref) ? ref[0] : ref;
  
  const currentEntityType = determineEntity(refString);

  const [articles, siteIdentity, contactData] = await Promise.all([
      getArticlesData(), 
      getSiteIdentity(currentEntityType),
      getContactData(currentEntityType)
  ]);

  const fixedSiteIdentity = {
    logo_url: siteIdentity?.logo_url, 
    site_name: siteIdentity?.site_name || "Pura Agung Kertajaya"
  };

  const themeConfig = {
    pura: {
        text: "text-orange-600 dark:text-orange-500",
        line: "bg-orange-500/60",
        gradient: "bg-gradient-to-r from-orange-600 to-amber-600",
        bg: "bg-orange-600 dark:bg-orange-500",
    },
    yayasan: {
        text: "text-blue-600 dark:text-blue-500",
        line: "bg-blue-500/60",
        gradient: "bg-gradient-to-r from-blue-600 to-cyan-600",
        bg: "bg-blue-600 dark:bg-blue-500",
    },
    pasraman: {
        text: "text-emerald-600 dark:text-emerald-500",
        line: "bg-emerald-500/60",
        gradient: "bg-gradient-to-r from-emerald-600 to-teal-600",
        bg: "bg-emerald-600 dark:bg-emerald-500",
    }
  };

  const theme = themeConfig[currentEntityType];

  return (
    <>
      <Navigation site={fixedSiteIdentity} entityType={currentEntityType} />

      <main className="min-h-screen bg-gray-50 dark:bg-black pb-20 pt-28 md:pt-32">
        <div className="container mx-auto px-4 md:px-6">

            <div className="text-center max-w-4xl mx-auto mb-16 space-y-6">

                <div className="flex items-center justify-center gap-4" data-aos="fade-up">
                    <div className={`h-[2px] w-8 md:w-12 ${theme.line}`}></div>
                    <span className={`${theme.text} text-xs md:text-sm font-bold tracking-[0.3em] uppercase`}>
                        Informasi Terkini
                    </span>
                    <div className={`h-[2px] w-8 md:w-12 ${theme.line}`}></div>
                </div>

                <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight" data-aos="fade-up" data-aos-delay="100">
                    Berita & <span className={`text-transparent bg-clip-text ${theme.bg}`}>Artikel</span>
                </h1>

                <p className="text-gray-600 dark:text-gray-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="200">
                    Ikuti perkembangan terbaru kegiatan, pengumuman, dan wawasan penting dari kami.
                </p>
            </div>

            <ArticlesFeed items={articles} entityType={currentEntityType} />

        </div>
      </main>

      <Footer site={siteIdentity} contact={contactData} />
    </>
  );
}
import { getArticleBySlug, getSiteIdentity, getContactData } from "@/lib/api"; 
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navigation from "@/components/layout/navigation"; 
import Footer from "@/components/layout/footer";
import { ArrowLeft, Calendar, User, Clock, MessageCircle, Facebook, Twitter, Linkedin } from "lucide-react";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  
  const baseUrl = process.env.BASE_URL 
    ? new URL(process.env.BASE_URL) 
    : new URL('https://puraagungkertajaya.my.id');

  if (!article) return { title: "Artikel Tidak Ditemukan" };

  let shareImage = '/default-share.jpg';
  if (article.images) {
      const imgs = (typeof article.images === 'string') ? JSON.parse(article.images) : article.images;
      shareImage = imgs.fhd || imgs['2xl'] || imgs.xl || imgs.lg || shareImage;
  }
  const description = article.excerpt 
      ? (article.excerpt.length > 150 ? article.excerpt.substring(0, 150) + "..." : article.excerpt)
      : "Baca artikel selengkapnya.";

  return {
    metadataBase: baseUrl, 

    title: `${article.title} | Pura Agung Kertajaya`,
    description: description,

    openGraph: {
        title: article.title,
        description: description,

        url: `/articles/${slug}`, 
        
        type: 'article',
        publishedTime: article.published_at,
        authors: [article.author_name || 'Admin'],
        section: article.category?.name || 'Berita',
        images: [
            {
                url: shareImage,
                width: 1200,
                height: 630,
                alt: article.title,
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: article.title,
        description: description,
        images: [shareImage],
    }
  };
}

function getMainImage(images: any) {
    if (!images) return null;
    return images.fhd || images["2xl"] || images.xl || images.lg || images.md || "";
}

function determineEntity(refParam: string | undefined, categoryName: string): "pasraman" | "yayasan" | "pura" {
    if (refParam === 'pasraman') return 'pasraman';
    if (refParam === 'yayasan') return 'yayasan';
    if (refParam === 'pura') return 'pura';

    const lowerCat = categoryName?.toLowerCase() || "";
    if (lowerCat.includes("pendidikan") || lowerCat.includes("sekolah")) return "pasraman";
    if (lowerCat.includes("sosial") || lowerCat.includes("donasi")) return "yayasan";
    
    return "pura";
}

export default async function ArticleDetailPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { ref } = await searchParams;
  
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const refString = Array.isArray(ref) ? ref[0] : ref;
  const currentEntityType = determineEntity(refString, article.category?.name);

  const [siteIdentity, contactData] = await Promise.all([
    getSiteIdentity(currentEntityType),
    getContactData(currentEntityType)
  ]);

  const fixedSiteIdentity = {
    logo_url: siteIdentity?.logo_url, 
    site_name: siteIdentity?.site_name || "Pura Agung Kertajaya"
  };

  const mainImage = getMainImage(article.images);
  const blurImage = article.images?.blur;

  const publishDate = new Date(article.published_at).toLocaleDateString("id-ID", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });

  const SITE_DOMAIN = process.env.BASE_URL || "https://puraagungkertajaya.my.id"; 
  const shareUrl = `${SITE_DOMAIN}/articles/${slug}`;
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(article.title);
  
  const shareBtnClass = "flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-black hover:text-white hover:border-black dark:hover:bg-white dark:hover:text-black transition-all duration-300";

  const formattedContent = article.content || "";

  const backLink = `/articles?ref=${currentEntityType}`;
  
  const accentColorClass = currentEntityType === 'pasraman' ? 'text-emerald-600' : 
                           currentEntityType === 'yayasan' ? 'text-blue-600' : 'text-orange-600';
                           
  const hoverColorClass = currentEntityType === 'pasraman' ? 'hover:text-emerald-600' : 
                          currentEntityType === 'yayasan' ? 'hover:text-blue-600' : 'hover:text-orange-600';

  return (
    <>
      <Navigation site={fixedSiteIdentity} entityType={currentEntityType} />

      <main className="min-h-[100dvh] bg-white dark:bg-black pb-20 pt-28 md:pt-32">
        
        <article className="container mx-auto px-4 md:px-0 max-w-4xl">
          
          <div className="mb-8 flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400">
              <Link href={backLink} className={`${hoverColorClass} transition-colors flex items-center gap-1`}>
                  <ArrowLeft className="w-4 h-4" /> Kembali ke Semua Berita
              </Link>
              <span className="text-gray-300">/</span>
              <span className={`${accentColorClass} truncate max-w-[200px]`}>
                  {article.category?.name || "Berita"}
              </span>
          </div>

          <header className="text-center mb-10 md:mb-14 space-y-6">
              {article.category && (
                  <span className={`inline-block px-3 py-1 text-xs font-bold tracking-widest uppercase bg-gray-50 dark:bg-gray-800 rounded-full border border-gray-100 dark:border-gray-700 ${accentColorClass}`}>
                      {article.category.name}
                  </span>
              )}
              
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                  {article.title}
              </h1>

              <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 text-sm text-gray-500 dark:text-gray-400 border-y border-gray-100 dark:border-gray-800 py-4 max-w-2xl mx-auto">
                  <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-gray-100 dark:bg-gray-800 rounded-full">
                          <User className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                      </div>
                      <span className="font-medium text-gray-700 dark:text-gray-300">{article.author_name}</span>
                  </div>
                  <div className="hidden md:block w-1 h-1 bg-gray-300 rounded-full"></div>
                  <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{publishDate}</span>
                  </div>
                   <div className="hidden md:block w-1 h-1 bg-gray-300 rounded-full"></div>
                   <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>3 Menit Baca</span>
                  </div>
              </div>
          </header>

          {mainImage && (
              <div className="relative aspect-video md:aspect-[21/9] w-full mb-12 md:mb-16 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                  <Image 
                      src={mainImage} 
                      alt={article.title}
                      fill
                      priority
                      placeholder={blurImage ? "blur" : "empty"}
                      blurDataURL={blurImage}
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                  />
              </div>
          )}

          <div className="max-w-3xl mx-auto px-2 md:px-0">
              <div 
                  className={`
                  prose prose-lg dark:prose-invert max-w-none
                  prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white
                  prose-p:text-gray-600 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-6
                  prose-a:${accentColorClass} prose-a:no-underline hover:prose-a:underline
                  prose-img:rounded-xl prose-img:shadow-lg prose-img:my-8 prose-img:w-full
                  prose-li:text-gray-600 dark:prose-li:text-gray-300
                  prose-blockquote:border-l-4 prose-blockquote:pl-4 
                  prose-blockquote:italic prose-blockquote:bg-gray-50 dark:prose-blockquote:bg-gray-900 
                  prose-blockquote:py-2 prose-blockquote:pr-2 prose-blockquote:rounded-r-lg
                  [&_p:empty]:min-h-[1.5em] 
                  [&_br]:block [&_br]:content-[''] [&_br]:mt-4
                  `}
                  dangerouslySetInnerHTML={{ __html: formattedContent }} 
              />
              
              <div className="mt-16 pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                      Bagikan Artikel:
                  </div>
                  <div className="flex flex-wrap gap-3">
                      <a href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`} target="_blank" rel="noopener noreferrer" className={shareBtnClass}>
                          <MessageCircle className="w-4 h-4" /> <span className="text-xs font-bold">WhatsApp</span>
                      </a>
                      <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`} target="_blank" rel="noopener noreferrer" className={shareBtnClass}>
                          <Facebook className="w-4 h-4" /> <span className="text-xs font-bold">Facebook</span>
                      </a>
                      <a href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`} target="_blank" rel="noopener noreferrer" className={shareBtnClass}>
                          <Twitter className="w-4 h-4" /> <span className="text-xs font-bold">X</span>
                      </a>
                      <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`} target="_blank" rel="noopener noreferrer" className={shareBtnClass}>
                          <Linkedin className="w-4 h-4" /> <span className="text-xs font-bold">LinkedIn</span>
                      </a>
                  </div>
              </div>
          </div>
        </article>
      </main>

      <Footer site={siteIdentity} contact={contactData} />
    </>
  );
}
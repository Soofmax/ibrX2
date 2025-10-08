import { Calendar, ArrowRight, BookOpen } from 'lucide-react';
import { blogPosts } from '../data/blogPosts';
import { useI18n } from '../i18n/I18nContext';

export default function BlogPosts() {
  const { t } = useI18n();

  return (
    <section id="blog" className="py-24 px-4 sm:px-6 lg:px-8 bg-green-50 relative overflow-hidden scroll-mt-24">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-40 right-20 w-96 h-96 bg-green-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-orange-600 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <BookOpen className="text-green-600 mx-auto" size={48} />
          </div>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-handwritten text-stone-900 mb-4">
            {t('blog.heading')}
          </h2>
          <p className="text-xl text-stone-600 font-serif">{t('blog.tagline')}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <article
              key={post.id}
              className="group bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-stone-200"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-stone-200">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute top-4 left-4">
                  <span className="bg-green-500 text-white text-xs font-serif px-3 py-1 rounded-full shadow-lg">
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-stone-500 mb-3">
                  <Calendar size={16} className="text-green-600" />
                  <time className="font-serif">{post.date}</time>
                </div>

                <h3 className="text-2xl font-handwritten text-stone-900 mb-3 group-hover:text-green-700 transition-colors">
                  {post.title}
                </h3>

                <p className="text-stone-600 font-serif leading-relaxed mb-4">
                  {post.excerpt}
                </p>

                <button type="button" className="flex items-center gap-2 text-green-600 font-serif hover:gap-3 transition-all group focus-ring">
                  <span>{t('blog.readMore')}</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <button type="button" className="bg-stone-900 hover:bg-stone-800 text-green-50 font-serif px-10 py-4 rounded-full text-lg transition-all hover:scale-105 shadow-xl focus-ring">
            {t('blog.viewAll')}
          </button>
        </div>
      </div>
    </section>
  );
}

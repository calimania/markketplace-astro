
type AlbumsGridProps = {
  albums?: any[];
  store?: any;
}

const AlbumsGrid = ({ albums, }: AlbumsGridProps) => {
  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {albums?.sort((a, b) => a.title.localeCompare(b.title)).map((album) => {
          const coverUrl = album.cover?.formats?.medium?.url || album.cover?.url;
          const trackCount = album.tracks?.length || 0;

          return (
            <a
              href={`#/album/${album.slug}`}
              key={album.id}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="aspect-square overflow-hidden">
                {coverUrl && (
                  <img
                    src={coverUrl}
                    alt={album.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                )}
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-blue-600 transition-colors">
                  {album.title}
                </h3>

                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">
                    {trackCount} {trackCount === 1 ? 'track' : 'tracks'}
                  </p>

                  {album.store?.title && (
                    <p className="text-sm font-medium text-gray-700">
                      {album.store.title}
                    </p>
                  )}
                </div>

                {album.description && (
                  <p className="mt-3 text-sm text-gray-500 line-clamp-2">
                    {album.description}
                  </p>
                )}
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
};

export default AlbumsGrid;

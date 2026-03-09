function Loading() {
  return (
    <div className="movies">
      {new Array(6).fill(0).map((_, index) => (
        <div className="movie" key={index}>
          <div className="movie__card">
            <div className="movie__img--wrapper">
              <div className="skeleton skeleton-img"></div>
            </div>

            <div className="movie__body">
              <div className="skeleton skeleton-text"></div>
              <div className="skeleton skeleton-text small"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Loading;

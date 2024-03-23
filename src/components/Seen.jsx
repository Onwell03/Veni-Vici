const Seen = ({images}) => {
    return(
        <div>
         <h2> Who have we seen so far?</h2>
            <div className="image-container">
                {images && images.length > 0 ? (
                    images.map((image, index) => (
                        <li className="gallery" key={index}>
                            <img 
                                src={image.url} 
                                key={index}
                                width="100"
                                className="gallery-screenshot"
                                alt="Undefined screenshot from query"/>
                                <p>{image.name}</p>
                        </li>
                    ))
                ) : (
                    <div>
                        <p>No photos to be shown</p>
                    </div>
                )}
            </div>
        </div>
    );
};
 
export default Seen;
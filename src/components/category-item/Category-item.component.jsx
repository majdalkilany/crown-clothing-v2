import "./category-item.style.scss";

const CategoryItem = ({ category: { title, imageUrl } }) => {
  console.log(imageUrl);
  return (
    <div className="category-container">
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      ></div>
      <div className="category-body-container">
        <h2> {title}</h2>
        <p> Shop Now</p>
      </div>
    </div>
  );
};
export default CategoryItem;

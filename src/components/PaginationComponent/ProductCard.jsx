export default function ProductCard({ title, images }) {
  return (
    <div className="product-card">
      <img className="product-image" src={images[0]} alt="name" />
      <div>{title}</div>
    </div>
  );
}

import { GiCctvCamera } from "react-icons/gi";

const KameraIkona = () => {
  return (
    <button
      style={{
        display: "flex",
        alignItems: "center",
        padding: "10px 20px",
        fontSize: "16px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        backgroundColor: "#f5f5f5",
        cursor: "pointer",
      }}
    >
      <GiCctvCamera style={{ marginRight: "8px" }} /> {/* Ikonica kamere */}
    </button>
  );
};

export default KameraIkona;

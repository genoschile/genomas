import { FaDna } from "react-icons/fa";

export const AdnLoader = () => {
  return (
    <div className="adn-loader">
      <FaDna className="dna-icon" />
      <span>Loading...</span>
      <style jsx>{`
        .adn-loader {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
          font-size: 1.5rem;
          color: #09f;
        }
        .dna-icon {
          margin-right: 10px;
          animation: spin 2s linear infinite;
        }
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
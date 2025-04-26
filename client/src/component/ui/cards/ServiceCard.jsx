import { useNavigate } from "react-router-dom";

function ServiceCard({id, icon, cardTitle, cardDescription, cardPrice, cardButtonText="Book Now", extraInfo}) {
    const navigate = useNavigate();

    const handleCardClick = () => {
        if (id) {
            navigate(`/services/${id}`);
        }
    };

    const handleButtonClick = (e) => {
        e.stopPropagation(); // Prevent the card click from triggering
        if (id) {
            // Navigate to address selection page with service data
            navigate(`/address-selection/${id}`, {
                state: {
                    serviceData: {
                        id,
                        name: cardTitle,
                        description: cardDescription,
                        price: cardPrice,
                        turnaround: extraInfo
                    }
                }
            });
        }
    };

    return (
        <div
            className="bg-white rounded-lg p-4 flex flex-col shadow-sm border border-gray-100 hover:shadow-md transition-all h-full cursor-pointer"
            onClick={handleCardClick}
        >
            <div className="flex items-center gap-3 mb-3">
                <div className="bg-primary p-2.5 rounded-lg flex items-center justify-center">
                    {icon}
                </div>
                <h3 className="text-gray-800 font-medium text-lg">{cardTitle}</h3>
            </div>
            <p className="text-gray-600 text-sm mb-3">{cardDescription}</p>

            {extraInfo && (
                <div className="flex items-center mb-3 text-xs text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Turnaround: {extraInfo}</span>
                </div>
            )}

            <div className="flex justify-between items-center mt-auto pt-2 border-t border-gray-100">
                <div className="font-semibold text-primary text-lg">{cardPrice}</div>
                <button
                    className="bg-primary text-white hover:bg-primary/90 px-3 py-1.5 rounded-lg text-sm transition-colors"
                    onClick={handleButtonClick}
                >
                    {cardButtonText}
                </button>
            </div>
        </div>
    );
}

export default ServiceCard;
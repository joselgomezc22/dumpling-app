import { useState, useEffect } from "react";

const ShopperAssignModal = ({
  shoppers,
  setOpenAssignModal,
  setShopperToOrder,
}) => {
  const [selectedShoppers, setSelectedShoppers] = useState([]);

  const Apply = () => {
    setShopperToOrder(selectedShoppers);
   
  };
  const Cancel = () => {
    setOpenAssignModal(false);
  }; 

  return (
    <div className="dt-modal">
      <div className="dt-modal-header">
        <p className="text-m-bold">Assign order to</p>
        <p className="dt-modal-header-phone text-m-bold ">Phone</p>
      </div>
      <div className="dt-modal-data">
        {shoppers.map((x) => (
          <>
            <label key={x.id} className="dt-modal-data-item">
              <div>
                <input
                  onChange={(e) => {
                    console.log(e.target.checked);
                    if (e.target.checked) {
                      const stateCopy = selectedShoppers.concat([
                        e.target.value,
                      ]);
                      setSelectedShoppers([...stateCopy]);
                    } else {
                      //remove from array

                      const stateCopy = selectedShoppers.filter((val) => {
                        return val !== e.target.value;
                      });
                      setSelectedShoppers([...stateCopy]);
                    }
                  }}
                  value={x.id}
                  type="checkbox"
                />
                {x.name}
              </div>
              <div>
                <p>{x.phone}</p>
              </div>
            </label>
          </>
        ))}
      </div>
      <div className="d-flex">
        <button
          onClick={() => {
            Cancel();
          }}
          className="btn text-m-bold"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            Apply();
          }}
          className="btn btn-primary"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default ShopperAssignModal;

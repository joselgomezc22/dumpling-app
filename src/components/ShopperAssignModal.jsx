import { useState, useEffect } from "react";

const ShopperAssignModal = ({ shoppers, setOpenAssignModal , setShopperToOrder }) => {
  const Apply = () => {
    setOpenAssignModal(false);
    setShopperToOrder(shoppers);
  };
  const Cancel = () => {
    setOpenAssignModal(false);
  };
  const [selectedShoppers, setSelectedShoppers] = useState([]);
  return (
    <div className="dt-modal">
      {JSON.stringify(shoppers)}
      {JSON.stringify(selectedShoppers)}
      <div className="dt-modal-header">
        <p className="text-m-bold">Assign order to</p>
        <p className="dt-modal-header-phone text-m-bold ">Phone</p>
      </div>
      <div className="dt-modal-data">
        {shoppers.map((x) => (
          <>
            <label className="dt-modal-data-item">
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
      <button
        onClick={() => {
          Apply();
        }}
        className="btn btn-primary"
      >
        Apply
      </button>
    </div>
  );
};

export default ShopperAssignModal;

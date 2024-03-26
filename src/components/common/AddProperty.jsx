import { Button, Dialog } from "@material-tailwind/react";
import { PopUp } from "../../pages/PopUp";
import { useState } from "react";

export default function addProperty() {
    const [size, setSize] = useState(null);
  const handleOpen = (value) => setSize(value);
    return (
        <>
           {/* to add property or listing */}
           <Button className='w-full p-4' onClick={() => handleOpen("xxl")} >
                  Add Property
                </Button>
                <Dialog
                  open={size === "xxl"}
                  size={size || "md"}
                  handler={handleOpen}
                >
                  <div className="flex justify-end mr-10">
                    <Button
                      variant="text"
                      color="red"
                      onClick={() => handleOpen(null)}
                      className="mt-1"
                    >
                      <svg className="w-9" viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                          <path opacity="0.5" d="M12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22Z" fill="#1C274C"></path>
                          <path d="M8.96967 8.96967C9.26256 8.67678 9.73744 8.67678 10.0303 8.96967L12 10.9394L13.9697 8.96969C14.2626 8.6768 14.7374 8.6768 15.0303 8.96969C15.3232 9.26258 15.3232 9.73746 15.0303 10.0303L13.0607 12L15.0303 13.9697C15.3232 14.2625 15.3232 14.7374 15.0303 15.0303C14.7374 15.3232 14.2625 15.3232 13.9696 15.0303L12 13.0607L10.0304 15.0303C9.73746 15.3232 9.26258 15.3232 8.96969 15.0303C8.6768 14.7374 8.6768 14.2626 8.96969 13.9697L10.9394 12L8.96967 10.0303C8.67678 9.73744 8.67678 9.26256 8.96967 8.96967Z" fill="#1C274C"></path>
                        </g>
                      </svg>
                    </Button>
                  </div>
                  <PopUp />
                </Dialog>
                {/* ------- */}
        </>
    )
}
import React from "react";

function Test() {
  const data = [1, 3, 5, 7, 9];

  return (
    <>
      {data > 0 &&
        data?.map((res) => {
          return (
            <>
              <div>
                <u font-15>Array All :{res} </u>
              </div>
              <div>
                <u font-15>Array big than 5: </u>
              </div>
              <div>
                <u font-15>Array number big to small : </u>
              </div>
            </>
          );
        })}
    </>
  );
}

export default Test;

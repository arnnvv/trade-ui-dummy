interface BidTableProps {
  bids: [string, string][];
}

const BidTable = ({ bids }: BidTableProps): JSX.Element => {
  let currentTotal: number = 0;
  const relevantBids = bids.slice(0, 10).reverse();
  const bidsWithTotal: [string, string, number][] = relevantBids.map(
    ([price, quantity]: [string, string]): [string, string, number] => [
      price,
      quantity,
      (currentTotal += Number(quantity)),
    ],
  );
  const maxTotal = relevantBids.reduce(
    (acc: number, [_, quantity]: [string, string]): number =>
      acc + Number(quantity),
    0,
  );

  return (
    <div>
      {" "}
      {bidsWithTotal?.map(
        ([price, quantity, total]: [string, string, number]): JSX.Element => (
          <div
            key={price}
            style={{
              display: "flex",
              position: "relative",
              width: "100%",
              backgroundColor: "transparent",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: `${(100 * total) / maxTotal}%`,
                height: "100%",
                background: "rgba(1, 167, 129, 0.325)",
                transition: "width 0.3s ease-in-out",
              }}
            ></div>
            <div className={`flex justify-between text-xs w-full`}>
              <div>{price}</div>
              <div>{quantity}</div>
              <div>{total.toFixed(2)}</div>
            </div>
          </div>
        ),
      )}
    </div>
  );
};

export default BidTable;

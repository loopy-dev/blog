const Test = () => {
  const headings = [
    ...Array.from(document.querySelectorAll('h1')),
    ...Array.from(document.querySelectorAll('h2')),
    ...Array.from(document.querySelectorAll('h3')),
  ];

  const ret = headings.sort(
    (a, b) => (Number(a.dataset.index) ?? 0) - (Number(b.dataset.index) ?? 0)
  );

  return (
    <div>
      {ret.map((head, index) => (
        <p key={index}>{head.textContent}</p>
      ))}
    </div>
  );
};

export default Test;

'use client';

export default function AffiliateLink({ productId }: { productId: string }) {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const clickId = crypto.randomUUID();
    window.location.assign(`/go/${productId}?click_id=${encodeURIComponent(clickId)}`);
  };

  return (
    <a className="cta" href={`/go/${productId}`} onClick={handleClick}>
      販売ページを見る
    </a>
  );
}

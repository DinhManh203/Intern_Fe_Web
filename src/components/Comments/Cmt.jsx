import React, { useEffect, useState } from "react";

const Cmt = () => {
  const [fbLoaded, setFbLoaded] = useState(false);
  const currentUrl = window.location.href;

  useEffect(() => {
    
    if (window.FB) {
      window.FB.XFBML.parse();
      setFbLoaded(true);
    } else {
      
      window.fbAsyncInit = () => {
        window.FB.init({
          xfbml: true,
          version: "v16.0"
        });
        setFbLoaded(true);
      };
    }
  }, []);

  // Danh sách bình luận ảo
  const fakeComments = [
    { id: 1, name: "Nguyễn Văn A", comment: "Sản phẩm này rất tuyệt vời!" },
    { id: 2, name: "Trần Thị B", comment: "Mình đã mua, rất hài lòng 🥰" },
    { id: 3, name: "Lê Văn C", comment: "Có ai dùng chưa? Đánh giá giúp mình với!" }
  ];

  return (
    <div>
      {!fbLoaded && (
        <div className="p-4 rounded-md bg-gray-100">
          <h3 className="text-lg font-semibold">Bình luận</h3>
          {fakeComments.map((item) => (
            <div key={item.id} className="p-2 border-b">
              <p className="font-medium">{item.name}</p>
              <p className="text-gray-700">{item.comment}</p>
            </div>
          ))}
        </div>
      )}

      {/* Facebook Comments Plugin */}
      <div className="fb-comments"
        data-href={currentUrl}
        data-width="100%"
        data-numposts="5">
      </div>
    </div>
  );
};

export default Cmt;

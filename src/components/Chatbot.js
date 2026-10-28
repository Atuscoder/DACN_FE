import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css';

// API backend của bạn - thay URL này bằng backend thật
const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      from: 'bot',
      text: 'Xin chào! 👋 Mình là trợ lý AI của PhoneStore. Bạn đang tìm điện thoại như thế nào? (ví dụ: iPhone dưới 20 triệu, Samsung pin trâu, máy chụp ảnh đẹp...)'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Gọi backend AI (bạn thay endpoint cho đúng)
  const callBackendAI = async (userMessage) => {
    try {
      const res = await fetch(`${API_BASE}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Nếu cần token: 'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ message: userMessage })
      });

      if (!res.ok) throw new Error('Backend error');
      const data = await res.json();
      return data.reply || data.message || 'Xin lỗi, mình chưa hiểu ý bạn.';
    } catch (err) {
      // Fallback: trả lời rule-based nếu backend chưa sẵn sàng
      return getFallbackReply(userMessage);
    }
  };

  // Trả lời tạm khi backend chưa có / lỗi
  const getFallbackReply = (msg) => {
    const lower = msg.toLowerCase();

    if (lower.includes('iphone') || lower.includes('apple')) {
      return '🍎 Hiện mình đang có:\n• iPhone 16 Pro Max (~35 triệu) - Flagship mạnh nhất\n• iPhone 15 (~19 triệu) - Rất đáng mua\nBạn muốn xem chi tiết máy nào không?';
    }
    if (lower.includes('samsung') || lower.includes('galaxy')) {
      return '📱 Samsung đang hot:\n• Galaxy S25 Ultra (~32 triệu) - Có S Pen + camera 200MP\n• Galaxy A56 (~10 triệu) - Tầm trung cực tốt\nBạn thích phân khúc nào?';
    }
    if (lower.includes('xiaomi') || lower.includes('redmi')) {
      return '⚡ Xiaomi giá tốt:\n• Xiaomi 15 Ultra (~25 triệu) - Camera Leica\n• Redmi Note 14 Pro (~8 triệu) - Camera 200MP\nBạn đang quan tâm máy nào?';
    }
    if (lower.includes('pin') || lower.includes('trâu')) {
      return '🔋 Máy pin trâu mình recommend:\n• OPPO Find X8 Pro (5910 mAh)\n• Xiaomi 15 Ultra (5400 mAh)\n• Redmi Note 14 Pro (5500 mAh)\nBạn cần dùng cả ngày nặng không?';
    }
    if (lower.includes('camera') || lower.includes('chụp') || lower.includes('ảnh')) {
      return '📸 Máy chụp ảnh đẹp:\n• iPhone 16 Pro Max - Chuyên nghiệp\n• Samsung S25 Ultra - 200MP\n• Xiaomi 15 Ultra - Leica\n• vivo V40 - ZEISS\nBạn thích chụp chân dung hay phong cảnh?';
    }
    if (lower.includes('giá') || lower.includes('rẻ') || lower.includes('dưới')) {
      return '💰 Phân khúc giá tốt:\n• Dưới 10 triệu: Redmi Note 14 Pro, Galaxy A56\n• 10-20 triệu: iPhone 15, vivo V40\n• Trên 20 triệu: iPhone 16 Pro Max, S25 Ultra\nBạn budget khoảng bao nhiêu?';
    }
    if (lower.includes('xin chào') || lower.includes('hello') || lower.includes('hi')) {
      return 'Chào bạn! 😊 Mình có thể tư vấn điện thoại theo nhu cầu: giá tiền, camera, pin, thương hiệu... Bạn cứ hỏi nhé!';
    }

    return 'Mình đang lắng nghe! Bạn có thể hỏi về:\n• Thương hiệu (iPhone, Samsung, Xiaomi...)\n• Nhu cầu (pin trâu, camera đẹp, giá rẻ)\n• So sánh 2 máy\nHoặc nói budget của bạn nhé!';
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = {
      id: Date.now(),
      from: 'user',
      text: input.trim()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const reply = await callBackendAI(userMsg.text);

    setMessages(prev => [
      ...prev,
      {
        id: Date.now() + 1,
        from: 'bot',
        text: reply
      }
    ]);
    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickQuestions = [
    'iPhone dưới 20 triệu',
    'Máy pin trâu',
    'Camera đẹp nhất',
    'Samsung tầm trung'
  ];

  return (
    <>
      {/* Nút mở chatbot */}
      <button
        className={`chatbot-toggle ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Mở chatbot"
      >
        {isOpen ? '✕' : '💬'}
      </button>

      {/* Cửa sổ chat */}
      {isOpen && (
        <div className="chatbot-window" id="chatbot">
          <div className="chatbot-header">
            <div className="bot-avatar">🤖</div>
            <div>
              <h4>Trợ lý AI PhoneStore</h4>
              <span className="bot-status">● Đang online</span>
            </div>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`message ${msg.from}`}>
                {msg.from === 'bot' && <span className="msg-avatar">🤖</span>}
                <div className="msg-bubble">
                  {msg.text.split('\n').map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      {i < msg.text.split('\n').length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ))}
            {loading && (
              <div className="message bot">
                <span className="msg-avatar">🤖</span>
                <div className="msg-bubble typing">
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Câu hỏi nhanh */}
          {messages.length <= 2 && (
            <div className="quick-questions">
              {quickQuestions.map((q) => (
                <button
                  key={q}
                  className="quick-btn"
                  onClick={() => {
                    setInput(q);
                    setTimeout(() => handleSend(), 100);
                  }}
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          <div className="chatbot-input">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Nhập câu hỏi của bạn..."
              rows={1}
            />
            <button onClick={handleSend} disabled={loading || !input.trim()}>
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Chatbot;

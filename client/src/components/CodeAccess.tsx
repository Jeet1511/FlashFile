import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ArrowRight } from 'lucide-react';

const CodeAccess: React.FC = () => {
    const [code, setCode] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmed = code.trim();
        if (trimmed.length > 0) {
            navigate(`/file/${trimmed}`);
        }
    };

    return (
        <div className="code-access">
            <div className="code-access-header">
                <div className="code-access-icon">
                    <Lock size={24} className="icon-breathe" />
                </div>
                <h3>Have a code?</h3>
            </div>
            <form onSubmit={handleSubmit} className="code-form">
                <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value.replace(/\s/g, ''))}
                    placeholder="Enter 6-character code"
                    maxLength={10}
                    className="code-input"
                    autoComplete="off"
                    spellCheck={false}
                />
                <button type="submit" className="btn btn-accent" disabled={code.trim().length === 0}>
                    Access File
                    <ArrowRight size={16} className="link-arrow" />
                </button>
            </form>
        </div>
    );
};

export default CodeAccess;

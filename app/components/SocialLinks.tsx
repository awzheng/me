import { Mail, Linkedin, Github, Twitter } from 'lucide-react';

export default function SocialLinks() {
    const socials = [
        { href: 'https://twitter.com/yourhandle', icon: Twitter, label: 'Twitter' },
        { href: 'https://linkedin.com/in/yourprofile', icon: Linkedin, label: 'LinkedIn' },
        { href: 'https://github.com/awzheng', icon: Github, label: 'GitHub' },
        { href: 'mailto:your.email@example.com', icon: Mail, label: 'Email' },
    ];

    return (
        <div className="social-links">
            {socials.map((social) => {
                const Icon = social.icon;
                return (
                    <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        title={social.label}
                    >
                        <Icon size={20} />
                    </a>
                );
            })}
        </div>
    );
}

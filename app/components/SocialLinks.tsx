import { Mail, Linkedin, Github, Twitter } from 'lucide-react';

export default function SocialLinks() {
    const socials = [
        { href: 'https://twitter.com/awhzheng', icon: Twitter, label: 'Twitter' },
        { href: 'https://linkedin.com/in/andrewzheng2007', icon: Linkedin, label: 'LinkedIn' },
        { href: 'https://github.com/awzheng', icon: Github, label: 'GitHub' },
        { href: 'mailto:andrew.zheng1@uwaterloo.ca', icon: Mail, label: 'Email' },
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

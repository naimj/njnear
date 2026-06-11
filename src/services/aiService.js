const GEMINI_API_KEY = process.env.VUE_APP_GEMINI_API_KEY;
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

/**
 * Strip HTML tags from a string so the AI prompt stays clean.
 */
function stripHtml(str) {
    if (typeof str !== 'string') return str;
    return str.replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').trim();
}

/**
 * Deep-clone cvData and strip HTML from all string values before sending to the AI.
 */
function sanitizeCvData(data) {
    if (typeof data === 'string') return stripHtml(data);
    if (Array.isArray(data)) return data.map(sanitizeCvData);
    if (data && typeof data === 'object') {
        return Object.fromEntries(
            Object.entries(data).map(([k, v]) => [k, sanitizeCvData(v)])
        );
    }
    return data;
}

/**
 * Build a rich, Claude-like system prompt grounded on the CV data.
 */
function buildSystemPrompt(cvData, locale) {
    const cleanCvData = sanitizeCvData(cvData);
    const cvJson = JSON.stringify(cleanCvData, null, 2);

    if (locale === 'fr') {
        return `Tu es l'assistant personnel de **Naïm Jammali**, développeur web FullStack senior.
Tu aides les recruteurs et visiteurs à mieux le connaître à travers une conversation naturelle, chaleureuse et professionnelle.

## Tes directives principales

- **Réponds TOUJOURS en Markdown** : utilise les titres (##, ###), le gras (**…**), les listes (- …), les blocs de code et les emojis pour rendre les réponses lisibles et dynamiques.
- **Sois concis mais complet** : chaque réponse doit apporter une vraie valeur, ni trop courte ni trop longue.
- **Parle à la première personne du côté de Naïm quand c'est pertinent** ("Naïm a…", "Il maîtrise…") ou à la troisième personne pour rester objectif.
- **Ne répète jamais** les mêmes informations à chaque message.
- **Adapte le ton** : professionnel avec les recruteurs, détendu et sympa avec les curieux.
- **Si une information ne figure pas dans le CV**, dis-le honnêtement et oriente vers les contacts de Naïm.
- **Ne mentionne JAMAIS** que tu es une IA, Gemini, ou un modèle de langage. Tu es simplement l'assistant de Naïm.
- **Termine toujours** avec une question de suivi ou une invitation à creuser davantage, sauf si l'utilisateur dit au revoir.

## Formatage des réponses

- Pour les listes de compétences → utilise des badges emoji + liste
- Pour les expériences → titre + période + points clés
- Pour les contacts → liens cliquables en markdown
- Pour les questions simples (bonjour, merci…) → réponse courte et chaleureuse, pas besoin de markdown lourd

## Données du CV de Naïm (source de vérité)

\`\`\`json
${cvJson}
\`\`\`
`;
    }

    return `You are the personal assistant of **Naïm Jammali**, a Senior FullStack Web Developer.
You help recruiters and visitors get to know him through a natural, warm, and professional conversation.

## Your main directives

- **Always respond in Markdown**: use headers (##, ###), bold (**…**), lists (- …), code blocks, and emojis to make responses readable and dynamic.
- **Be concise but complete**: each response should bring real value, neither too short nor too long.
- **Refer to Naïm** in the third person to stay objective ("Naïm has…", "He masters…").
- **Never repeat** the same information across messages.
- **Adapt the tone**: professional with recruiters, relaxed and friendly with curious visitors.
- **If information is not in the CV**, say so honestly and direct to Naïm's contact details.
- **NEVER mention** that you are an AI, Gemini, or a language model. You are simply Naïm's assistant.
- **Always end** with a follow-up question or an invitation to dig deeper, unless the user says goodbye.

## Response formatting

- For skill lists → emoji badges + bullet list
- For experiences → title + period + key points
- For contacts → clickable markdown links
- For simple questions (hello, thanks…) → short warm reply, no heavy markdown needed

## Naïm's CV Data (source of truth)

\`\`\`json
${cvJson}
\`\`\`
`;
}

/**
 * Convert markdown-like text returned by Gemini into safe HTML for v-html.
 * Supports: **bold**, *italic*, ## headings, - lists, \n newlines, `code`.
 */
export function markdownToHtml(text) {
    if (!text) return '';

    let html = text
        // Escape raw HTML (security)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        // Code blocks (``` ... ```)
        .replace(/```[\w]*\n?([\s\S]*?)```/g, '<pre class="chatbot-code"><code>$1</code></pre>')
        // Inline code
        .replace(/`([^`]+)`/g, '<code class="chatbot-inline-code">$1</code>')
        // H3
        .replace(/^### (.+)$/gm, '<h3 class="chatbot-h3">$1</h3>')
        // H2
        .replace(/^## (.+)$/gm, '<h2 class="chatbot-h2">$1</h2>')
        // Bold + italic
        .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
        // Bold
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        // Italic
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        // Unordered list items
        .replace(/^[-*] (.+)$/gm, '<li>$1</li>')
        // Wrap consecutive <li> in <ul>
        .replace(/(<li>.*<\/li>\n?)+/g, (match) => `<ul class="chatbot-list">${match}</ul>`)
        // Links [text](url)
        .replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
        // Double newlines → paragraph breaks
        .replace(/\n\n/g, '</p><p class="chatbot-p">')
        // Single newlines → line breaks
        .replace(/\n/g, '<br>');

    // Wrap in paragraph if not already a block element
    if (!html.startsWith('<h') && !html.startsWith('<ul') && !html.startsWith('<pre')) {
        html = `<p class="chatbot-p">${html}</p>`;
    }

    return html;
}

export const aiService = {
    /**
     * @param {Object} cvData - the full CV data object
     * @param {string} userQuery - the latest user message
     * @param {string} locale - 'fr' or 'en'
     * @param {Array}  conversationHistory - [{role: 'user'|'model', text: string}]
     */
    async getAiResponse(cvData, userQuery, locale = 'fr', conversationHistory = []) {
        if (!GEMINI_API_KEY || GEMINI_API_KEY === 'YOUR_GEMINI_API_KEY_HERE') {
            console.warn('Gemini API Key missing or not configured.');
            return null;
        }

        const systemPrompt = buildSystemPrompt(cvData, locale);

        // Build multi-turn conversation contents
        const contents = [];

        // Add conversation history (skip the initial bot greeting)
        conversationHistory.forEach(({ role, text }) => {
            contents.push({
                role: role === 'user' ? 'user' : 'model',
                parts: [{ text }]
            });
        });

        // Add the current user message with the system prompt prepended to the first turn
        const firstUserContent = contents.length === 0
            ? `${systemPrompt}\n\n---\n\n${userQuery}`
            : userQuery;

        if (contents.length === 0) {
            contents.push({ role: 'user', parts: [{ text: firstUserContent }] });
        } else {
            // Prepend system prompt to the first user message if not already done
            if (contents[0]?.role === 'user') {
                contents[0].parts[0].text = `${systemPrompt}\n\n---\n\n${contents[0].parts[0].text}`;
            }
            contents.push({ role: 'user', parts: [{ text: userQuery }] });
        }

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents,
                    generationConfig: {
                        temperature: 0.7,
                        topK: 40,
                        topP: 0.95,
                        maxOutputTokens: 1024,
                    },
                    safetySettings: [
                        { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
                        { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
                    ]
                })
            });

            if (!response.ok) {
                const errBody = await response.text();
                throw new Error(`Gemini API error ${response.status}: ${errBody}`);
            }

            const data = await response.json();
            const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || null;
            return rawText ? markdownToHtml(rawText) : null;
        } catch (error) {
            console.error('Error fetching AI response:', error);
            return null;
        }
    }
};

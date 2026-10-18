// ============================================================================
// usuarios.js - Cadastro de e-mails do AZLinks
// ----------------------------------------------------------------------------
// COMO CADASTRAR: adicione uma linha na lista USUARIOS, neste formato:
//
//     'email@exemplo.com': ['Nome da Pessoa', 'ID_DA_PLANILHA'],
//
// - O nome aparece no rodapé do app, em "Licenciado para:".
// - O ID da planilha é o trecho entre /d/ e /edit no endereço dela:
//     https://docs.google.com/spreadsheets/d/  1AbC...XyZ  /edit
//                                              ^^^^^^^^^^^
//   (Se preferir, pode colar o link inteiro da planilha que o ID é extraído sozinho.)
//
// Este arquivo deve ficar na MESMA pasta do index.html.
// ============================================================================

// URL do Apps Script, informada uma única vez. Todos os e-mails abaixo usam este
// mesmo Apps Script; o que muda de um e-mail para outro é a planilha.
const AZLINKS_URL_APPS_SCRIPT = 'https://script.google.com/macros/s/AKfycbyNRHauds83by09v_Dq5wYROW87ycWqqf1mn48VeRi7MXCHyh0g4v6VtnEULq8_jpA/exec';

// Lista de usuários: 'e-mail': ['Nome', 'ID da planilha'],  (uma linha por pessoa, com vírgula no final)
const USUARIOS = {
    'sbstor@gmail.com':            ['Sebastião Torquato',   '1w85zj8OpavB_Jzb1SnnmExm5PlvIZVvmNoalPlPSHeQ'],
    'outra-pessoa@exemplo.com':    ['Nome da Outra Pessoa', 'ID_DA_PLANILHA_2'],
    'mais-uma-pessoa@exemplo.com': ['Mais Uma Pessoa',      'ID_DA_PLANILHA_3'],
};

// ============================================================================
// A partir daqui não precisa mexer.
// ============================================================================

// Aceita o ID puro ou o link completo da planilha e devolve só o ID.
function azlinksExtrairId(valor) {
    const texto = String(valor || '').trim();
    const m = texto.match(/\/d\/([a-zA-Z0-9_-]+)/);
    return m ? m[1] : texto;
}

// Procura o usuário pelo e-mail (ignora maiúsculas/minúsculas e espaços).
// Retorna { email, nome, url, planilha } ou null se o e-mail não estiver cadastrado.
function azlinksBuscarUsuario(email) {
    const chave = String(email || '').trim().toLowerCase();
    if (!chave) return null;

    for (const cadastrado in USUARIOS) {
        if (cadastrado.trim().toLowerCase() === chave) {
            const dados = USUARIOS[cadastrado] || [];
            return {
                email: chave,
                nome: String(dados[0] || '').trim() || chave,
                url: AZLINKS_URL_APPS_SCRIPT,
                planilha: azlinksExtrairId(dados[1])
            };
        }
    }
    return null;
}

// src/services/pullRequestService.ts

import { Context } from 'probot';

// Definindo interfaces para os tipos que vêm da API do GitHub.
// Isso ajuda o TypeScript a entender a estrutura dos dados e resolve os erros de 'implicit any'.
interface PullRequestFile {
  filename: string;
  status: string;
}

interface PullRequestLabel {
  name: string;
}

/**
 * Constrói uma string de contexto detalhada a partir de um evento de Pull Request.
 * Esta função agrega metadados essenciais e as mudanças de código de um PR
 * em um formato estruturado (Markdown) para ser enviado a um LLM para análise.
 * @param context O objeto de contexto do Probot para o evento de pull request.
 * @returns Uma string formatada contendo o título, corpo, diff, arquivos alterados e outras informações relevantes do PR.
 */
export async function buildPullRequestContext(context: Context<"pull_request.opened">): Promise<string> {
  // Extrai o objeto principal do pull request do payload do evento para fácil acesso.
  const pr = context.payload.pull_request;

  // 1. Obter o diff do Pull Request.
  const diffResponse = await context.octokit.pulls.get({
    owner: context.payload.repository.owner.login,
    repo: context.payload.repository.name,
    pull_number: pr.number,
    mediaType: {
      format: "diff",
    },
  });
  const diff = diffResponse.data as unknown as string;

  // 2. Obter a lista de arquivos alterados.
  const filesResponse = await context.octokit.pulls.listFiles({
    owner: context.payload.repository.owner.login,
    repo: context.payload.repository.name,
    pull_number: pr.number,
  });
  const changedFiles = filesResponse.data.map((file: PullRequestFile) =>
    `- ${file.filename} (Status: ${file.status})`
  ).join('\n');

  // 3. Obter as labels do PR.
  // CORREÇÃO: Usado o operador OU Lógico (||) em vez do OU bit-a-bit (|).
  const labels = pr.labels?.map((label: PullRequestLabel) => label.name).join(', ') || 'Nenhuma';

  // 4. Montar o contexto completo em uma única string.
  const prContext = `
    ### Título do Pull Request ###
    ${pr.title}

    ### Número e Link ###
    #${pr.number} - ${pr.html_url}

    ### Autor ###
    @${pr.user?.login}

    ### Branches ###
    De: \`${pr.head.ref}\`
    Para: \`${pr.base.ref}\`

    ### Labels ###
    ${labels}

    ### Descrição do Pull Request ###
    ${pr.body || 'Nenhuma descrição fornecida.'} // CORREÇÃO: Usado o operador OU Lógico (||) aqui também.

    ### Arquivos Alterados ###
    ${changedFiles}

    ### Diff Completo do Pull Request ###
    \`\`\`diff
    ${diff}
    \`\`\`
  `;

  return prContext.trim();
}
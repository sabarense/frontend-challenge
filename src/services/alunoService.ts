import axios from "axios";
import { AlunoRequestDTO } from "../models/AlunoRequestDTO";

const API_URL = "http://localhost:8080/alunos";

export const criarAluno = async (aluno: AlunoRequestDTO) => {
  try {
    const response = await axios.post(API_URL, aluno);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar aluno:", error);
    throw new Error("Erro ao criar aluno");
  }
};

export const getAlunos = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar alunos:", error);
    throw new Error("Erro ao buscar alunos");
  }
};

export const getAlunoFrequencia = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/frequencia/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar frequência do aluno com id ${id}:`, error);
    throw new Error(`Erro ao buscar frequência do aluno com id ${id}`);
  }
};

export const getAlunoMedia = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/media-notas/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar média de notas do aluno com id ${id}:`, error);
    throw new Error(`Erro ao buscar média de notas do aluno com id ${id}`);
  }
};

export const atualizarNotas = async (id: number, aluno: AlunoRequestDTO) => {
  try {
    const response = await axios.put(`${API_URL}/notas/${id}`, aluno); 
    return response.data;
  } catch (error) {
    console.error(`Erro ao atualizar notas do aluno com id ${id}:`, error);
    throw new Error(`Erro ao atualizar notas do aluno com id ${id}`);
  }
};

export const calcularMediaFrequenciaTurma = async () => {
  try {
    const response = await axios.get(`${API_URL}/media-frequencia-turma`);
    return response.data;
  } catch (error) {
    console.error("Erro ao calcular média e frequência da turma:", error);
    throw new Error("Erro ao calcular média e frequência da turma");
  }
};

export const calcularMediaTurma = async () => {
  try {
    const response = await axios.get(`${API_URL}/media-notas-turma-disciplina`);
    return response.data;
  } catch (error) {
    console.error("Erro ao calcular média da turma:", error);
    throw new Error("Erro ao calcular média da turma");
  }
};

export const getAlunoAcimaMediaTurma = async () => {
  try {
    const response = await axios.get(`${API_URL}/acima-media-turma`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar alunos acima da média da turma:", error);
    throw new Error("Erro ao buscar alunos acima da média da turma");
  }
};

export const getAlunoAbaixoFrequencia = async () => {
  try {
    const response = await axios.get(`${API_URL}/abaixo-frequencia`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar alunos abaixo da frequência:", error);
    throw new Error("Erro ao buscar alunos abaixo da frequência");
  }
};

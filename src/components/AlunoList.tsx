import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Card, CardContent, Button } from "@mui/material";
import { AlunoRequestDTO } from "../models/AlunoRequestDTO";
import {
  getAlunos,
  calcularMediaTurma,
  getAlunoAcimaMediaTurma,
  getAlunoAbaixoFrequencia,
} from "../services/alunoService";

const AlunoList = () => {
  const [alunos, setAlunos] = useState<AlunoRequestDTO[]>([]);
  const [mediaTurma, setMediaTurma] = useState<number>(0);
  const [alunosAcimaMedia, setAlunosAcimaMedia] = useState<AlunoRequestDTO[]>([]);
  const [alunosAbaixoFrequencia, setAlunosAbaixoFrequencia] = useState<AlunoRequestDTO[]>([]);

  const buscarDados = async () => {
    try {
      const alunosData = await getAlunos();
      setAlunos(alunosData);

      const mediaTurmaData = await calcularMediaTurma();
      console.log("Média da turma recebida do back-end:", mediaTurmaData);
      setMediaTurma(Number(mediaTurmaData) || 0);

      const alunosAcimaMediaData = await getAlunoAcimaMediaTurma();
      setAlunosAcimaMedia(alunosAcimaMediaData);

      const alunosAbaixoFrequenciaData = await getAlunoAbaixoFrequencia();
      setAlunosAbaixoFrequencia(alunosAbaixoFrequenciaData);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    }
  };

  useEffect(() => {
    buscarDados();
  }, []);

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Lista de alunos
      </Typography>

      <Typography variant="h5" gutterBottom>
        Média da turma: <strong>{Number(mediaTurma).toFixed(2)}</strong>
      </Typography>

      <Grid container spacing={3}>
        {alunos.map((aluno, index) => {
          const mediaAluno =
            aluno.notas.reduce((acc, nota) => acc + nota, 0) / aluno.notas.length;
          const frequenciaBaixa = aluno.frequencia < 75;
          const acimaMediaTurma = alunosAcimaMedia.includes(aluno);

          return (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
  sx={{
    backgroundColor: acimaMediaTurma
      ? "#c8e6c9"  // Verde suave para alunos acima da média
      : frequenciaBaixa
      ? "#ffccbc"  // Laranja suave para alunos com frequência baixa
      : "#ffffff", // Branco para os demais
    boxShadow: 3,
    minHeight: 200, // Altura mínima para o card (ajuste conforme necessário)
    boxSizing: 'border-box', // Garante que o padding não aumente o tamanho do card
  }}
>
  <CardContent sx={{ padding: 2 }}>
    <Typography variant="h6" gutterBottom>
      {aluno.nome}
    </Typography>
    <Typography variant="body1" gutterBottom>
      <strong>Média das notas:</strong> {mediaAluno.toFixed(2)}
    </Typography>
    <Typography variant="body1" gutterBottom>
      <strong>Frequência:</strong> {aluno.frequencia}%
    </Typography>
    {acimaMediaTurma && (
      <Typography variant="body2" color="success.main" sx={{ mt: 1 }}>
        Aluno acima da média da turma!
      </Typography>
    )}
    {frequenciaBaixa && (
      <Typography variant="body2" color="error.main" sx={{ mt: 1 }}>
        Frequência abaixo de 75%!
      </Typography>
    )}
  </CardContent>
</Card>

            </Grid>
          );
        })}
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Alunos com média acima da turma:
        </Typography>
        {alunosAcimaMedia.length > 0 ? (
          <ul>
            {alunosAcimaMedia.map((aluno, index) => (
              <li key={index}>{aluno.nome}</li>
            ))}
          </ul>
        ) : (
          <Typography variant="body1">Nenhum aluno com média acima da turma.</Typography>
        )}

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Alunos com frequência abaixo de 75%:
        </Typography>
        {alunosAbaixoFrequencia.length > 0 ? (
          <ul>
            {alunosAbaixoFrequencia.map((aluno, index) => (
              <li key={index}>{aluno.nome}</li>
            ))}
          </ul>
        ) : (
          <Typography variant="body1">Nenhum aluno com frequência abaixo de 75%.</Typography>
        )}
      </Box>

      <Box sx={{ mt: 4, textAlign: "center" }}>
        <Button variant="contained" color="primary" onClick={buscarDados}>
          Atualizar Dados
        </Button>
      </Box>
    </Box>
  );
};

export default AlunoList;

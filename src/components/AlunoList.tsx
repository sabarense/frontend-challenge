import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
} from "@mui/material";
import { AlunoRequestDTO } from "../models/AlunoRequestDTO";
import { getAlunos, calcularMediaTurma } from "../services/alunoService";

const AlunoList = () => {
  const [alunos, setAlunos] = useState<AlunoRequestDTO[]>([]);
  const [mediasTurma, setMediasTurma] = useState<number[]>([]);

  const buscarDados = async () => {
    try {
      const alunosData = await getAlunos();
      setAlunos(alunosData);

      const mediasTurmaData = await calcularMediaTurma();
      setMediasTurma(mediasTurmaData);
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
        Lista de Alunos
      </Typography>

      <Box sx={{ mt: 3 }}>
        <Typography variant="h5">Média da turma por disciplina:</Typography>
        <Box sx={{ display: "flex", gap: 2, mt: 2, flexWrap: "wrap" }}>
          {mediasTurma.map((media, index) => (
            <Chip
              key={index}
              label={`Disciplina ${index + 1}: ${media.toFixed(2)}`}
              color="primary"
              variant="outlined"
            />
          ))}
        </Box>
      </Box>

      <Grid container spacing={3} sx={{ mt: 3 }}>
        {alunos.map((aluno, index) => {
          const acimaMediaDisciplinas = aluno.notas.map(
            (nota, i) => nota > (mediasTurma[i] || 0)
          );
          const abaixoMediaDisciplinas = aluno.notas.map(
            (nota, i) => nota < (mediasTurma[i] || 0)
          );
          const naMediaDisciplinas = aluno.notas.map(
            (nota, i) => nota === (mediasTurma[i] || 0)
          );
          const frequenciaBaixa = aluno.frequencia < 75;

          return (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  backgroundColor:
                    frequenciaBaixa
                      ? "#ffccbc"
                      : acimaMediaDisciplinas.some(Boolean)
                      ? "#c8e6c9"
                      : abaixoMediaDisciplinas.some(Boolean)
                      ? "#ffebee"
                      : naMediaDisciplinas.some(Boolean)
                      ? "#e0f7fa" 
                      : "#ffffff",
                  boxShadow: 3,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <CardContent
                  sx={{
                    padding: 2,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    flexGrow: 1,
                  }}
                >
                  <Typography variant="h6" gutterBottom>
                    {aluno.nome}
                  </Typography>

                  <Typography variant="body1" gutterBottom>
                    <strong>Frequência:</strong> {aluno.frequencia}%{" "}
                    {frequenciaBaixa && (
                      <Chip
                        label="Frequência Baixa"
                        color="error"
                        size="small"
                        sx={{ ml: 1 }}
                      />
                    )}
                  </Typography>

                  <Typography variant="body1" gutterBottom>
                    <strong>Notas por disciplina:</strong>
                  </Typography>

                  {aluno.notas.map((nota, i) => (
                    <Box key={i} sx={{ mb: 1 }}>
                      <Typography
                        variant="body2"
                        sx={{ display: "flex", alignItems: "center" }}
                      >
                        Disciplina {i + 1}: {nota.toFixed(2)}{" "}
                        {nota > (mediasTurma[i] || 0) && (
                          <Chip
                            label="Acima da média"
                            color="success"
                            size="small"
                            sx={{ ml: 1 }}
                          />
                        )}
                        {nota < (mediasTurma[i] || 0) && (
                          <Chip
                            label="Abaixo da média"
                            color="error"
                            size="small"
                            sx={{ ml: 1 }}
                          />
                        )}
                        {nota === (mediasTurma[i] || 0) && (
                          <Chip
                            label="Na média"
                            color="info"
                            size="small"
                            sx={{ ml: 1 }}
                          />
                        )}
                      </Typography>
                    </Box>
                  ))}
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      <Box sx={{ mt: 4, textAlign: "center" }}>
        <Button variant="contained" color="primary" onClick={buscarDados}>
          Recarregar página
        </Button>
      </Box>
    </Box>
  );
};

export default AlunoList;

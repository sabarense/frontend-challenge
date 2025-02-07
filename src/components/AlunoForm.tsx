import React, { useState } from "react";
import { AlunoRequestDTO } from "../models/AlunoRequestDTO";
import { criarAluno } from "../services/alunoService";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  Snackbar,
  Alert,
} from "@mui/material";

const AlunoForm = () => {
  const [notas, setNotas] = useState<number[]>([]);
  const [frequencia, setFrequencia] = useState<number | "">("");
  const [nome, setNome] = useState<string>("");
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const validarAluno = () => {
    if (!nome || nome.trim() === "") {
      setSnackbar({
        open: true,
        message: "Nome do aluno é obrigatório",
        severity: "error",
      });
      return false;
    }
    if (notas.some((nota) => nota < 0 || nota > 10)) {
      setSnackbar({
        open: true,
        message: "As notas devem ser valores entre 0 e 10",
        severity: "error",
      });
      return false;
    }
    if (frequencia === "" || frequencia < 0 || frequencia > 100) {
      setSnackbar({
        open: true,
        message: "A frequência deve ser um valor entre 0 e 100",
        severity: "error",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validarAluno()) return;

    const aluno: AlunoRequestDTO = {
      nome,
      notas,
      frequencia: Number(frequencia),
    };
    try {
      await criarAluno(aluno);
      setSnackbar({
        open: true,
        message: "Aluno criado com sucesso!",
        severity: "success",
      });
      setNome("");
      setNotas([]);
      setFrequencia("");
    } catch (error) {
      console.error("Erro ao criar aluno", error);
      setSnackbar({
        open: true,
        message: "Ocorreu um erro ao criar o aluno",
        severity: "error",
      });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: 2,
      }}
    >
      <Card sx={{ maxWidth: 500, width: "100%" }}>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            Informações do aluno
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Nome"
                  variant="outlined"
                  fullWidth
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1">Notas</Typography>
                {Array(5)
                  .fill(null)
                  .map((_, index) => (
                    <Grid item xs={12} key={index}>
                      <TextField
                        label={`Nota na disciplina ${index + 1}`}
                        variant="outlined"
                        type="number"
                        fullWidth
                        value={!isNaN(notas[index]) ? notas[index] : ""}
                        onChange={(e) => {
                          const inputValue = e.target.value;
                          const newNotas = [...notas];
                          newNotas[index] =
                            inputValue === "" ? NaN : parseFloat(inputValue);
                          setNotas(newNotas);
                        }}
                        required
                        InputProps={{
                          inputProps: {
                            step: 0.1,
                            min: 0,
                            max: 10,
                          },
                        }}
                      />
                    </Grid>
                  ))}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Frequência (%)"
                  variant="outlined"
                  type="number"
                  fullWidth
                  value={frequencia}
                  onChange={(e) =>
                    setFrequencia(
                      e.target.value === "" ? "" : Number(e.target.value)
                    )
                  }
                  required
                  InputProps={{
                    inputProps: {
                      step: 0.1,
                      min: 0,
                      max: 100,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  type="submit"
                >
                  Registrar aluno
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AlunoForm;

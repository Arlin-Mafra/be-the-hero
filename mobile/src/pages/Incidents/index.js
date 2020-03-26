import React, { useState, useEffect } from "react";
import { View, Image, Text } from "react-native";
import { Feather } from "@expo/vector-icons";

import LogoImg from "../../assets/logo.png";
import { useNavigation } from "@react-navigation/native";
import Api from "../../services/api";
import styles from "./styles";
import { TouchableOpacity, FlatList } from "react-native-gesture-handler";

export default function Incidents() {
  const [incidents, setIncidents] = useState([]);
  const [total, setTotal] = useState(0);
  const [loadind, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const navigation = useNavigation();

  function navigateDetail(incident) {
    navigation.navigate("Detail", { incident });
  }

  async function loadIncidents() {
    if (loadind) {
      return;
    }

    if (total > 0 && incidents.length === total) {
      return;
    }

    setLoading(true);

    const response = await Api.get("incidents", {
      params: { page }
    });

    setIncidents([...incidents, ...response.data]);
    setTotal(response.headers["x-total-count"]);
    setPage(page + 1);
    setLoading(false);
  }

  useEffect(() => {
    loadIncidents();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={LogoImg} />
        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}>{total} casos</Text>
        </Text>
      </View>
      <Text style={styles.title}>Bem vindo(a)!</Text>
      <Text style={styles.description}>
        Escolha um dos casos abaixo e salve o dia!
      </Text>

      <FlatList
        data={incidents}
        style={styles.incidentLists}
        keyExtractor={incident => String(incident.id)}
        showsVerticalScrollIndicator={false}
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.2}
        renderItem={({ item: incident }) => (
          <View style={styles.incident}>
            <Text style={styles.incidentPropert}>ONG</Text>
            <Text style={styles.incidentValue}>{incident.name}</Text>

            <Text style={styles.incidentPropert}>CASO:</Text>
            <Text style={styles.incidentValue}>{incident.title}</Text>

            <Text style={styles.incidentPropert}>VALOR</Text>
            <Text style={styles.incidentValue}>
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL"
              }).format(incident.value)}
            </Text>

            <TouchableOpacity
              style={styles.detailsButtonText}
              onPress={() => navigateDetail(incident)}
            >
              <Text style={styles.detailText}>Ver mais detalhes</Text>
              <Feather name="arrow-right" size={16} color="#E20041" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

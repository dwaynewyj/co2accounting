import "./slayout.css";
import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useAuth0 } from "@auth0/auth0-react";
import SettingsIcon from "@mui/icons-material/Settings";
import BookmarksIcon from "@mui/icons-material/Bookmarks";

import LogoutButton from "../Auth/log-out-button.js";
import { useLocation } from "react-router-dom";

import Overview from "./LocationComponent/overview.js";
import LoadingPage from "./LocationComponent/loading-page.js";

import CircularProgress from "@mui/material/CircularProgress";
import LocationExpenses from "./ExpenseComponent/location-expenses.js";
import EditExpense from "./ExpenseComponent/ExpenseEdit/edit-expense.js";
import ClientOverview from "./ClientComponent/overview.js";
import InventoryReport from "../InventoryReport/inventory-report.js";
import Setting from "./SettingComponent/setting.js";
import { axiosBaseInstance } from "../../Service/axios-instance";

import AssessmentIcon from "@mui/icons-material/Assessment";
const { Header, Content, Sider } = Layout;
const tabs = ["1", "2", "3"].map((key) => ({
  key,
  label: `nav ${key}`,
}));

const SLayout = ({}) => {
  const location = useLocation();
  let client = location.state.client;
  let customer = location.state.customer;

  const { user } = useAuth0();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [collapsed, setCollapsed] = useState(false);
  const [navigations, setNavigations] = useState([]);
  const [clients, setClients] = useState([]);
  const [updated, setUpdated] = useState(false);

  const [locations, setLocations] = useState(null);

  const fetchClientOrganizations = (cust_org_id) => {
    const fetchClientOrganizationsData = async () => {
      try {
        const response = await axiosBaseInstance.get("/clients/menu", {
          params: {
            cust_org_id: user.cust_org_id,
          },
        });
        setClients(response?.data?.clients);
        setOverviewClientId(client._id);
        setUpdated(false);
      } catch (error) {
        console.error("Error occurred:", error);
      }
    };
    fetchClientOrganizationsData();
  };

  useEffect(() => {
    if (user) {
      fetchClientOrganizations();
    }
  }, [user, updated]);

  useEffect(() => {
    let navigations = [];
    clients.map((client, index) => {
      const key = String(index + 1);
      navigations.push({
        key: `client_org_${client._id}`,
        icon: React.createElement(CorporateFareIcon),
        label: `${client.client_org_data.client_org_name}`,
        children: [
          {
            key: `overview_${client._id}`,
            label: `Overview`,
            icon: React.createElement(DashboardIcon),
            value: client,
          },
          ...client.locations.map((location, index) => {
            return {
              key: `client_loc_${location._id}`,
              label: `${location.client_loc_data.client_loc_name}`,
              icon: React.createElement(LocationOnIcon),
              value: location,
            };
          }),
        ],
      });
    });

    navigations.push({
      key: `dashboard`,
      icon: React.createElement(BookmarksIcon),
      label: `Dashboard`,
    });
    navigations.push({
      key: `analysis`,
      icon: React.createElement(BookmarksIcon),
      label: `Analysis`,
    });
    clients?.length > 0 &&
      navigations.push({
        key: `inventory_reports`,
        icon: React.createElement(AssessmentIcon),
        label: `Reporting`,
      });
    navigations.push({
      key: `manage_clients`,
      icon: React.createElement(BookmarksIcon),
      label: `Clients`,
    });

    navigations.push({
      key: `settings`,
      icon: React.createElement(SettingsIcon),
      label: `Settings`,
    });
    setNavigations(navigations);
  }, [clients, setClients]);

  useEffect(() => {
    if (user) {
      fetchClientOrganizations();
    }
  }, [user]);

  function isLocationPrefix(str) {
    return str.startsWith("client_loc_");
  }

  function isOverviewPrefix(str) {
    return str.startsWith("overview_");
  }

  const extractSuffix = (str) => {
    const clientLocPrefix = "client_loc_";
    const overviewPrefix = "overview_";
    let suffix = "";

    if (str.startsWith(clientLocPrefix)) {
      suffix = str.substring(clientLocPrefix.length);
    } else if (str.startsWith(overviewPrefix)) {
      suffix = str.substring(overviewPrefix.length);
    }

    return suffix;
  };

  const [inventoryReports, setInventoryReports] = useState(false);
  const [settings, setSettings] = useState(false);
  const [manageClients, setManageClients] = useState(false);

  const [overview, setOverview] = useState(true);
  const [overviewClientId, setOverviewClientId] = useState(null);

  const [clientLocation, setClientLocation] = useState(false);
  const [clientLocationtId, setClientLocationId] = useState(null);

  const [selectedYear, setSelectedYear] = useState("2024");
  const [selectedLocation, setSelectedLocation] = useState(
    `overview_${client._id}`,
  );
  const [globalClient, setGlobalClient] = useState(client);
  const [globalLocation, setGlobalLocation] = useState(null);
  const [globalExpense, setGlobalExpense] = useState(null);

  useEffect(() => {
    setSelectedYear(selectedYear);
  }, [selectedYear, setSelectedYear]);

  useEffect(() => {
    if (globalLocation) {
      setOverview(false);
      setClientLocation(true);
      setClientLocationId(globalLocation.location._id);
      setSelectedLocation(`client_loc_${globalLocation.location._id}`);
      setSelectedYear(globalLocation.year);
    }
  }, [globalLocation, setGlobalLocation]);

  function findMatchingId(data, targetId) {
    for (const item of data) {
      const locations = item.locations;
      for (const location of locations) {
        if (location._id === targetId) {
          return location;
        }
      }
    }
    return null; // Return null if no match is found
  }
  const [isLocationsLoading, setIsLocationsLoading] = useState(false);

  const fetchLocations = (cust_org_id) => {
    setIsLocationsLoading(true);
    const fetchLocationsData = async () => {
      try {
        const response = await axiosBaseInstance.get("/location", {
          params: {
            client_org_id: globalClient._id,
          },
        });
        setLocations(response?.data?.locations);
        setIsLocationsLoading(false);
        setUpdated(false);
      } catch (error) {
        console.error("Error occurred:", error);
      }
    };
    fetchLocationsData();
  };

  useEffect(() => {
    fetchLocations();
  }, [client, updated, globalClient]);

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Header style={{ display: "flex", alignItems: "center" }}>
        <Grid
          container
          spacing={0}
          direction="row"
          alignItems="center"
          justifyContent="center"
        >
          <Grid item xs={3}>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                padding: "10px",
                width: "100%",
              }}
            >
              <img src={"/static/logo.svg"} width="100px" />
            </div>
          </Grid>
          <Grid item xs={7}></Grid>

          <Grid
            item
            xs={2}
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <LogoutButton />
          </Grid>
        </Grid>
      </Header>
      <Layout>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          width={250}
          style={{ background: colorBgContainer }}
        >
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={
              inventoryReports
                ? ["inventory_reports"]
                : settings
                  ? ["settings"]
                  : manageClients
                    ? ["manage_clients"]
                    : selectedLocation.startsWith("client_loc_")
                      ? ["dashboard"]
                      : [selectedLocation]
            }
            style={{
              height: "100%",
              borderRight: 0,
            }}
            items={navigations}
            onClick={(nav) => {
              // console.log("nav.key:", nav.key);
              if (isLocationPrefix(nav.key)) {
                const location_id = extractSuffix(nav.key);
                setOverview(false);
                setClientLocation(true);
                setClientLocationId(location_id);
                setSelectedLocation(`client_loc_${location_id}`);
                let tempClient = findMatchingId(clients, location_id);
                setGlobalLocation({ year: selectedYear, location: tempClient });
                setGlobalExpense(null);
                setManageClients(false);
                setSettings(false);
                setInventoryReports(false);
              } else if (isOverviewPrefix(nav.key)) {
                const client_id = extractSuffix(nav.key);
                setOverview(true);
                setClientLocation(false);
                setOverviewClientId(client_id);
                setGlobalClient(clients.find((c) => c._id === client_id));
                setSelectedLocation(`overview_${client_id}`);
                setGlobalLocation(null);
                setGlobalExpense(null);
                setManageClients(false);
                setSettings(false);
                setInventoryReports(false);
              } else if (nav.key === "analysis") {
                alert("The feature is still developing");
              } else if (nav.key === "inventory_reports") {
                setManageClients(false);
                setSettings(false);
                setInventoryReports(true);
              } else if (nav.key === "manage_clients") {
                setManageClients(true);
                setSettings(false);
                setInventoryReports(false);
              } else if (nav.key === "settings") {
                setManageClients(false);
                setSettings(true);
                setInventoryReports(false);
              } else {
                setSelectedLocation(nav.key);
                setManageClients(false);
                setSettings(false);
                setInventoryReports(false);
              }
            }}
          />
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
              style: { position: "none" },
            },
          )}
        </Sider>
        <Layout style={{}}>
          <Content
            style={{
              background: colorBgContainer,

              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundAttachment: "fixed",
              backgroundImage: `url(/static/background.png)`,
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: overviewClientId ? "flex-start" : "center",
              }}
            >
              {inventoryReports ? (
                <InventoryReport customer={customer} clients={clients} />
              ) : settings ? (
                <Setting customer={customer} />
              ) : manageClients ? (
                <ClientOverview
                  customer={customer}
                  clients={clients}
                  setGlobalClient={setGlobalClient}
                  setUpdated={setUpdated}
                />
              ) : overview ? (
                overviewClientId ? (
                  <Overview
                    client={globalClient}
                    locations={locations}
                    setGlobalLocation={setGlobalLocation}
                    updated={updated}
                    setUpdated={setUpdated}
                    isLocationsLoading={isLocationsLoading}
                  />
                ) : (
                  <CircularProgress />
                )
              ) : globalLocation?.location ? (
                globalExpense ? (
                  <EditExpense
                    client={globalClient}
                    year={selectedYear}
                    setYear={setSelectedYear}
                    globalExpense={globalExpense}
                    setGlobalExpense={setGlobalExpense}
                  />
                ) : (
                  <LocationExpenses
                    client={globalClient}
                    location={globalLocation.location}
                    year={selectedYear}
                    setYear={setSelectedYear}
                    setUpdated={setUpdated}
                    setOverview={setOverview}
                    setGlobalExpense={setGlobalExpense}
                    setGlobalLocation={setGlobalLocation}
                  />
                )
              ) : (
                <LoadingPage />
              )}
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default SLayout;

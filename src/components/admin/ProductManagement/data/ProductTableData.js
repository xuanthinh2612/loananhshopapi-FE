// @mui material components
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/shared/MDBox";
import MDTypography from "components/shared/MDTypography";
import MDAvatar from "components/shared/MDAvatar";
import MDProgress from "components/shared/MDProgress";

// Images
import LogoAsana from "assets/images/small-logos/logo-asana.svg";
import logoGithub from "assets/images/small-logos/github.svg";
import logoAtlassian from "assets/images/small-logos/logo-atlassian.svg";
import logoSlack from "assets/images/small-logos/logo-slack.svg";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import logoInvesion from "assets/images/small-logos/logo-invision.svg";
import { formatter } from "utils/helper";
import MDBadge from "components/shared/MDBadge";
import { MenuItem, colors } from "@mui/material";
import MDButton from "components/shared/MDButton";
import * as productService from "service/productService";
import configs from "configs";
import { Link, useNavigate } from "react-router-dom";
import ConfirmModal from "components/shared/ConfirmModal";
import DataTable from "components/shared/DataTable";
import { useState } from "react";
// import productServicefrom "service/productService";

function ProductTableData({ productList, callback }) {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [action, setAction] = useState();
  const [selectedId, setSelectedId] = useState();

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const handleClickButton = async (e) => {
    setSelectedId(e.target.id);
    setAction(e.target.name);
    setModalOpen(true);
  };

  const handleConfirmAction = async (action, selectedId) => {
    switch (action) {
      case "delete":
        await handleDelete(selectedId);
        break;
      case "edit":
        await handleEdit(selectedId);
        break;
      case "public":
        await handlePublic(selectedId);
        break;
      case "soldOut":
        await handleSoldOut(selectedId);
        break;
      case "band":
        await handleBand(selectedId);
        break;
      case "onSale":
        await handleOnSale(selectedId);
        break;
    }
    callback(true);
    handleCloseModal();
  };

  const handleDelete = async (id) => {
    const result = await productService.deleteProduct(id);
  };

  const handleEdit = async (id) => {
    navigate("/edit-product/" + id);
  };

  const handlePublic = async (id) => {
    const result = await productService.setPublicProduct(id);
  };

  const handleSoldOut = async (id) => {
    const result = await productService.setSoldOutProduct(id);
  };

  const handleBand = async (id) => {
    const result = await productService.bandProduct(id);
  };

  const handleOnSale = async (id) => {
    const result = await productService.setOnSaleProduct(id);
  };

  const Product = ({ image, name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" variant="rounded" />
      <MDTypography
        display="block"
        variant="button"
        fontWeight="medium"
        ml={1}
        lineHeight={1}
      >
        {name}
      </MDTypography>
    </MDBox>
  );

  const getStatusText = (status) => {
    if (status === 1) {
      return { statusText: "pending", color: "text" };
    } else if (status === 2) {
      return { statusText: "available", color: "success" };
    } else if (status === 3) {
      return { statusText: "banded", color: "dark" };
    } else if (status === 4) {
      return { statusText: "soldOut", color: "dark" };
    } else if (status === 5) {
      return { statusText: "sale", color: "text" };
    }
  };

  const columns = [
    { Header: "mặt hàng", accessor: "product", width: "30%", align: "left" },
    { Header: "giá", accessor: "price", align: "left" },
    { Header: "status", accessor: "status", align: "center" },
    { Header: "action", accessor: "action", align: "left" },
  ];

  const rows = productList
    ? productList.map((product) => {
        const { statusText, color } = getStatusText(product.status);

        return {
          product: (
            <Link target="_blank" to={`/product-detail/${product.id}`}>
              <Product image={product.avatar.imageUrl} name={product.name} />
            </Link>
          ),
          price: (
            <MDTypography variant="button" color="text" fontWeight="medium">
              {formatter.format(product.currentPrice)}
            </MDTypography>
          ),

          status: (
            <MDBox ml={-1}>
              <MDBadge
                badgeContent={statusText}
                color={color}
                variant="gradient"
                size="sm"
              />
            </MDBox>
          ),
          action: (
            <>
              <MDBox>
                <MDButton
                  sx={{ mx: 1 }}
                  onClick={(e) => handleClickButton(e)}
                  color="primary"
                  variant="gradient"
                  size="small"
                  name="delete"
                  id={product.id}
                >
                  Xóa
                </MDButton>
                <MDButton
                  sx={{ mx: 1 }}
                  onClick={(e) => handleClickButton(e)}
                  color="warning"
                  variant="gradient"
                  size="small"
                  name="edit"
                  id={product.id}
                >
                  Sửa
                </MDButton>
                {product.status === 1 || product.status === 3 ? (
                  <MDButton
                    sx={{ mx: 1 }}
                    onClick={(e) => handleClickButton(e)}
                    color="info"
                    variant="gradient"
                    size="small"
                    name="public"
                    id={product.id}
                  >
                    Công Khai
                  </MDButton>
                ) : null}
                {product.status != 4 ? (
                  <MDButton
                    sx={{ mx: 1 }}
                    onClick={(e) => handleClickButton(e)}
                    color="dark"
                    variant="gradient"
                    size="small"
                    name="soldOut"
                    id={product.id}
                  >
                    Hết Hàng
                  </MDButton>
                ) : null}
                {product.status != 3 ? (
                  <MDButton
                    sx={{ mx: 1 }}
                    onClick={(e) => handleClickButton(e)}
                    color="dark"
                    variant="gradient"
                    size="small"
                    name="band"
                    id={product.id}
                  >
                    Gỡ khỏi kệ
                  </MDButton>
                ) : null}
                {product.status != 5 ? (
                  <MDButton
                    sx={{ mx: 1 }}
                    onClick={(e) => handleClickButton(e)}
                    color="success"
                    variant="gradient"
                    size="small"
                    name="onSale"
                    id={product.id}
                  >
                    Khuyến mãi
                  </MDButton>
                ) : null}
              </MDBox>
            </>
          ),
        };
      })
    : [];

  return (
    <>
      <DataTable
        table={{ columns, rows }}
        isSorted={false}
        entriesPerPage={false}
        showTotalEntries={false}
        noEndBorder
      />
      <ConfirmModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={() => {
          handleConfirmAction(action, selectedId);
        }}
        title="Xác Nhận"
        message="Bạn có chắc muốn thực hiện?"
      />
    </>
  );
}

export default ProductTableData;

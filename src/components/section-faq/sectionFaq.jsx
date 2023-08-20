import styles from "./sectionFaq.module.scss";
import { styled } from "@mui/material/styles";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import MuiAccordion from "@mui/material/Accordion";
import { ReactComponent as Arrow } from "../../icons/arrow.svg";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(() => ({
  background: 'inherit',
  border: "none",
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    {...props}
    expandIcon={<Arrow sx={{ fontSize: "0.9rem" }} style={{fill: "white"}} />}
  />
))(() => ({
  backgroundColor: "none",
  borderBottom: "1px solid #fff",
  margin: "0px",
  paddingLeft: "0px",
  flexDirection: 'row',
  "&.Mui-expanded": {
    borderBottom: "none",
  },
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(-90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginTop: "16px",
    marginBottom: "24px",
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(0),
    paddingBottom: '30px',
  borderBottom: "1px solid #fff",
}));

const SectionFaq = () => {
  return (
      <section className={styles.accordionSection}>
    <div className={styles.border}></div>
      <div className={styles.accordionWrapper}>
        <h2 className={styles.accordionHeader}>Найчастіші запитання</h2>
        <Accordion>
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <h3 className={styles.summaryHeader}>
              Що я можу придбати у вашому магазині?
            </h3>
          </AccordionSummary>
          <AccordionDetails>
            <p className={styles.detailParagraph}>
              У нашому асортименті представлені вироби пастили та фріпсів.
              Пастила - це смаколик, виготовлений із фруктово-ягідного пюре.
              Висушений у дегідраторі за низьких температур, що дає змогу
              зберігати всі поживні речовини. Фріпси - це смачні та корисні
              чіпси із фруктових сматочків, виготовлені шляхом дегідрації без
              додавання цукру та консервантів.
            </p>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <h3 className={styles.summaryHeader}>Цукор є?</h3>
          </AccordionSummary>
          <AccordionDetails>
            <p className={styles.detailParagraph}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </p>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <h3 className={styles.summaryHeader}>
              Що таке "Йогуртові цукерки"?
            </h3>
          </AccordionSummary>
          <AccordionDetails>
            <p className={styles.detailParagraph}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </p>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <h3 className={styles.summaryHeader}>Як правильно зберігати?</h3>
          </AccordionSummary>
          <AccordionDetails>
            <p className={styles.detailParagraph}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </p>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <h3 className={styles.summaryHeader}>Який термін доставки?</h3>
          </AccordionSummary>
          <AccordionDetails>
            <p className={styles.detailParagraph}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </p>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <h3 className={styles.summaryHeader}>Чому саме Sushka.in.ua?</h3>
          </AccordionSummary>
          <AccordionDetails>
            <p className={styles.detailParagraph}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </p>
          </AccordionDetails>
        </Accordion>
      </div>
    </section>
  );
};

export default SectionFaq;

/* eslint-disable react/no-unescaped-entities */
import styles from './sectionFaq.module.scss'
import { styled } from '@mui/material/styles'
import MuiAccordionSummary from '@mui/material/AccordionSummary'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import MuiAccordion from '@mui/material/Accordion'
import { ReactComponent as Arrow } from '../../icons/arrow.svg'

const Accordion = styled((props) => {
  return <MuiAccordion disableGutters elevation={0} square {...props} />
})(() => {
  return {
    'background': 'inherit',
    'border': 'none',
    '&:not(:last-child)': {
      borderBottom: 0
    },
    '&:before': {
      display: 'none'
    }
  }
})

const AccordionSummary = styled((props) => {
  return (
    <MuiAccordionSummary
      {...props}
      expandIcon={
        <Arrow sx={{ fontSize: '0.9rem' }} style={{ fill: 'white' }} />
      }
    />
  )
})(() => {
  return {
    'backgroundColor': 'none',
    'borderBottom': '1px solid #fff',
    'margin': '0px',
    'paddingLeft': '0px',
    'flexDirection': 'row',
    '&.Mui-expanded': {
      borderBottom: 'none'
    },
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(-90deg)'
    },
    '& .MuiAccordionSummary-content': {
      marginTop: '16px',
      marginBottom: '24px'
    }
  }
})

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => {
  return {
    padding: theme.spacing(0),
    paddingBottom: '30px',
    borderBottom: '1px solid #fff'
  }
})

const SectionFaq = () => {
  return (
    <section className={styles.accordionSection} id="faq">
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
              Так, але, це природній цукор, який міститься у фруктах та ягодах.
              Ми не додаємо жодних барвників чи консервантів. У складі тільки
              фрукти та ягоди. В деяких видах пастили присутні додатки - горіхи,
              кокос, м'ята та ін.
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
              Йогуртові цукерки - це та сама пастила, але з додаванням у склад
              білого йогурту. Має ніжний молочний смак. Скручена у зручні
              рогалики-цукерки.
            </p>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <h3 className={styles.summaryHeader}>Як правильно зберігати?</h3>
          </AccordionSummary>
          <AccordionDetails>
            <p className={styles.detailParagraph}>
              Наші продукти не люблять вологи! Термін зберігання класичної
              пастили на основі яблука – 6 місяців, йогуртової пастили – 3
              місяці, фріпсів до 12 місяців. Краще за все для зберігання
              підходить темне місце при кімнатній температурі 16-22 градусів.
              Уникайте потрапляння прямих сонячних променів. Для прикладу це
              може бути закрита поличка, або шафа на вашій кухні. Для тари
              підійде скляна банка, лоток, чи відерко з щільною кришкою. Для
              збереження початкового смаку краще зберігати кожен смак в окремій
              тарі.
            </p>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <h3 className={styles.summaryHeader}>Який термін доставки?</h3>
          </AccordionSummary>
          <AccordionDetails>
            <p className={styles.detailParagraph}>
              Все залежить від вибору служби доставки. В середньому 2-5 днів без
              урахування святкових та вихідних. Потурбуйтесь про завчасне
              замовлення, якщо бажаєте отримати товари до конкретної дати.
            </p>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <h3 className={styles.summaryHeader}>Чому саме Sushka.in.ua?</h3>
          </AccordionSummary>
          <AccordionDetails>
            <p className={styles.detailParagraph}>
              Чому ми? Тому, що у нас домашнє крафтове виробництво, в якому ми
              використовуємо домашні та органічні фрукти та ягоди. Саме це дає
              змогу споживати наші смаколики дітям від 6 місяців, дорослим, що
              слідкують за вагою, спортсменам, вагітним та мамам на ГВ, і всім
              хто полюбляє солоденьке. У складі немає - цукру, барвників та
              консервантів, натомість, є усі необхідні вітаміни для якісного
              функціонування організсу. Більш ніж за рік нашої праці ми отримали
              сотні позитивних відгуків про наші продукти, що надають ще більше
              мотивації.
            </p>
          </AccordionDetails>
        </Accordion>
      </div>
    </section>
  )
}

export default SectionFaq

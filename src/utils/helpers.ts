export const format = {
  cardId: (cardId: string) => {
    if (cardId?.length !== 11) {
      return cardId;
    } else {
      return (
        cardId.substring(0, 3) +
        "-" +
        cardId.substring(3, 10) +
        "-" +
        cardId.substring(10)
      );
    }
  },
  hour: (date: Date) => {
    if (date?.getHours() > 12) {
      return `${date?.getHours() - 12} : ${date?.getMinutes()} PM`;
    }
    return `${date?.getHours()} : ${date?.getMinutes()} AM`;
  },
  phone: (phone: string) => {
    if (!phone) {
      return "";
    }

    if (phone.length !== 10) {
      return phone;
    }

    return `(${phone.substring(0, 3)}) ${phone.substring(
      3,
      6
    )}-${phone.substring(6)}`;
  },
  day: (day: number) => {
    const days: any = {
      1: "Lunes",
      2: "Martes",
      3: "Miercoles",
      4: "Jueves",
      5: "Viernes",
      6: "Sabado",
      7: "Domingo",
    };

    return days[day] || "";
  },
  month: (month: number) => {
    const months: any = {
      1: "Enero",
      2: "Febrero",
      3: "Marzo",
      4: "Abril",
      5: "Mayo",
      6: "Junio",
      7: "Julio",
      8: "Agosto",
      9: "Septiembre",
      10: "Octubre",
      11: "Noviembre",
      12: "Diciembre",
    };

    return months[month] ?? "";
  },
  money: (number?: number, currency?: string): string => {
    if (!number) {
      return "";
    }
    const formated = new Intl.NumberFormat("es-DO", {
      style: "currency",
      currency: currency ?? "DOP",
      minimumFractionDigits: 2,
    });

    return formated.format(number);
  },
  maritalStatus: (status: string) => {
    const statuses: any = {
      S: "Soltero",
      C: "Casado",
      U: "Unión Libre",
    };

    return statuses[status] || "";
  },
  gender: (genderCode: string) => {
    const statuses: any = {
      M: "Masculino",
      F: "Femenino",
    };

    return statuses[genderCode] || "";
  },
};

export function avoidNotNumerics(event: any) {
  if (["Backspace", "Delete", "Tab"].includes(event.key)) {
    return;
  }

  const isNumber = !isNaN(Number(event.key));
  const hasPoint = event.target.value.includes(".");
  const isFirstPoint = event.key === "." && !event.target.value.includes(".");
  const have2Decimals =
    hasPoint && event.target.value.split(".").pop()?.length === 2;

  if ((!isNumber && !isFirstPoint) || have2Decimals) event.preventDefault();
}

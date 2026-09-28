import React, { useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";
import Select from "react-select";
import { Arrow } from "@/Components/HomeUI";
import { revenueOptions, segmentOptions } from "@/data/contactOptions";

const formatPhone = (value) => {
    const numbers = value.replace(/\D/g, "").slice(0, 11);
    if (numbers.length <= 2) return numbers ? `(${numbers}` : "";
    if (numbers.length <= 6) return numbers.replace(/^(\d{2})(\d+)/, "($1) $2");
    if (numbers.length <= 10)
        return numbers.replace(/^(\d{2})(\d{4})(\d+)/, "($1) $2-$3");
    return numbers.replace(/^(\d{2})(\d{5})(\d+)/, "($1) $2-$3");
};
const fields = [
    {
        name: "nome",
        type: "text",
        label: "Nome e sobrenome",
        placeholder: "Qual é o seu nome e sobrenome?",
        autoComplete: "name",
    },
    {
        name: "email",
        type: "email",
        label: "E-mail corporativo",
        placeholder: "Qual seu e-mail corporativo?",
        autoComplete: "email",
    },
    {
        name: "empresa",
        type: "text",
        label: "Empresa",
        placeholder: "Qual o nome da sua empresa?",
        autoComplete: "organization",
    },
    {
        name: "telefone",
        type: "tel",
        label: "Telefone",
        placeholder: "Qual seu telefone?",
        autoComplete: "tel-national",
    },
    {
        name: "faturamento",
        label: "Faturamento mensal",
        placeholder: "Qual o faturamento mensal da sua empresa?",
        options: revenueOptions,
    },
    {
        name: "segmento",
        label: "Segmento",
        placeholder: "Qual o seu segmento?",
        options: segmentOptions,
    },
];

const selectComponents = { IndicatorSeparator: null };
const selectStyles = { menuPortal: (base) => ({ ...base, zIndex: 60 }) };

const fieldBase =
    "h-[52px] w-full rounded-xl border px-4 text-[15px] outline-offset-2 transition-[border-color,background-color] duration-200 max-md:text-[16px]";
const fieldTheme = {
    dark: "border-[rgba(174,187,209,.2)] bg-[rgba(174,187,209,.07)] text-x8-ice",
    light: "border-[#d4dbe5] bg-[#f3f6fb] text-x8-ink",
};
const inputClass = {
    dark: `${fieldBase} ${fieldTheme.dark} placeholder:text-[#8b9ab4] placeholder:opacity-100 focus:border-x8-blue focus:bg-white/[.08] focus:ring-1 focus:ring-x8-blue aria-[invalid=true]:border-[#ee9696]`,
    light: `${fieldBase} ${fieldTheme.light} placeholder:text-[#929baa] placeholder:opacity-100 focus:border-x8-blue focus:ring-1 focus:ring-x8-blue aria-[invalid=true]:border-[#ee9696]`,
};

const selectClassNames = (variant, invalid) => {
    const light = variant === "light";
    return {
        control: ({ isFocused }) =>
            [
                fieldBase,
                fieldTheme[variant],
                "cursor-pointer pr-3 [&_input]:h-auto [&_input]:border-0 [&_input]:bg-transparent [&_input]:p-0 [&_input]:shadow-none",
                isFocused && "ring-1 ring-x8-blue",
                isFocused && !invalid && "!border-x8-blue",
                isFocused && !light && "!bg-white/[.08]",
                invalid && "!border-[#ee9696]",
            ]
                .filter(Boolean)
                .join(" "),
        valueContainer: () => "p-0",
        placeholder: () => (light ? "text-[#929baa]" : "text-[#8b9ab4]"),
        singleValue: () => (light ? "text-x8-ink" : "text-x8-ice"),
        dropdownIndicator: ({ selectProps }) =>
            `transition-colors duration-200 [&_svg]:transition-transform [&_svg]:duration-[250ms] ${
                selectProps.menuIsOpen
                    ? `${light ? "text-x8-royal" : "text-x8-accent"} [&_svg]:rotate-180`
                    : "text-[#8b9ab4]"
            }`,
        menu: () =>
            `my-2 animate-[select-menu-in_.18s_ease-out] rounded-[14px] border p-1.5 ${
                light
                    ? "border-[#d4dbe5] bg-white shadow-[0_20px_40px_rgba(10,18,37,.12)]"
                    : "border-x8-accent/20 bg-x8-ink shadow-[0_24px_48px_rgba(0,0,0,.45)]"
            }`,
        option: ({ isFocused, isSelected }) => {
            const state = isSelected
                ? light
                    ? "bg-[#e3ecfb] text-x8-royal"
                    : "bg-x8-blue/20 text-x8-accent"
                : `${light ? "text-x8-ink" : "text-x8-ice"} ${isFocused ? (light ? "bg-[#eef3fb]" : "bg-x8-accent/[.12]") : ""}`;
            return `cursor-pointer rounded-[9px] px-3.5 py-[11px] text-[14px] leading-[1.4] transition-colors duration-150 ${state}`;
        },
    };
};

const FormSelect = ({
    id,
    name,
    value,
    options,
    placeholder,
    invalid,
    errorId,
    variant,
    onChange,
}) => {
    const selectOptions = options.map((option) => ({
        value: option,
        label: option,
    }));
    return (
        <Select
            inputId={id}
            name={name}
            unstyled
            isSearchable={false}
            options={selectOptions}
            value={
                selectOptions.find((option) => option.value === value) || null
            }
            onChange={(option) => onChange(name, option ? option.value : "")}
            placeholder={placeholder}
            aria-invalid={invalid}
            aria-errormessage={invalid ? errorId : undefined}
            components={selectComponents}
            styles={selectStyles}
            menuPortalTarget={
                typeof document === "undefined" ? null : document.body
            }
            menuPlacement="auto"
            maxMenuHeight={280}
            classNames={selectClassNames(variant, invalid)}
        />
    );
};

export function HeroProjectForm({
    submitUrl = "/contato/enviar",
    privacyUrl = "/politica-de-privacidade",
    buttonLabel = "Falar com especialista",
    fieldPrefix = "hero",
    variant = "dark",
}) {
    const light = variant === "light";
    const [localErrors, setLocalErrors] = useState({});
    const {
        data,
        setData,
        post,
        processing,
        errors,
        clearErrors,
        reset,
        recentlySuccessful,
    } = useForm({
        nome: "",
        email: "",
        empresa: "",
        telefone: "",
        faturamento: "",
        segmento: "",
        politica: !light,
        origem: "",
        campanha: "",
        grupo: "",
        termo: "",
        anuncio: "",
        entrada: "",
        posicao_formulario: light ? "Contato" : "Hero",
    });
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        setData((current) => ({
            ...current,
            origem: params.get("origin") || params.get("utm_source") || "",
            campanha:
                params.get("campaign") || params.get("utm_campaign") || "",
            grupo: params.get("group") || params.get("utm_group") || "",
            termo: params.get("term") || params.get("utm_term") || "",
            anuncio: params.get("ad") || params.get("utm_content") || "",
            entrada: new Date().toISOString(),
        }));
    }, []);
    const setField = (name, value) => {
        setData(name, value);
        clearErrors(name);
        setLocalErrors((current) => {
            const next = { ...current };
            delete next[name];
            return next;
        });
    };
    const handleChange = ({ target }) =>
        setField(
            target.name,
            target.type === "checkbox"
                ? target.checked
                : target.name === "telefone"
                  ? formatPhone(target.value)
                  : target.value,
        );
    const handleSubmit = (event) => {
        event.preventDefault();
        const nextErrors = {};
        fields.forEach((field) => {
            if (!data[field.name].trim())
                nextErrors[field.name] =
                    `Preencha ${field.label.toLowerCase()}.`;
        });
        if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
            nextErrors.email = "Informe um e-mail válido.";
        if (data.telefone && data.telefone.replace(/\D/g, "").length < 10)
            nextErrors.telefone = "Informe um telefone com DDD.";
        if (!data.politica)
            nextErrors.politica =
                "Concorde com a Política de Privacidade para continuar.";
        setLocalErrors(nextErrors);
        if (Object.keys(nextErrors).length) {
            document
                .getElementById(`${fieldPrefix}-${Object.keys(nextErrors)[0]}`)
                ?.focus();
            return;
        }
        post(submitUrl, {
            preserveScroll: true,
            onSuccess: () =>
                reset(
                    "nome",
                    "email",
                    "empresa",
                    "telefone",
                    "faturamento",
                    "segmento",
                    "politica",
                ),
        });
    };
    const allErrors = { ...errors, ...localErrors };
    const unknownErrors = Object.keys(errors).filter(
        (key) =>
            !fields.some((field) => field.name === key) && key !== "politica",
    );
    return (
        <form
            className={`relative rounded-[26px] border max-lg:p-[26px] max-md:rounded-[22px] max-md:px-[22px] max-md:py-[26px] ${
                light
                    ? "border-[#e1e5ed] bg-[#f7f9fc] p-10"
                    : "border-x8-accent/20 bg-[linear-gradient(155deg,rgba(20,43,89,.6),rgba(8,16,36,.86))] p-8"
            }`}
            onSubmit={handleSubmit}
            noValidate
            aria-label={
                light
                    ? "Solicitar diagnóstico"
                    : "Fale com um especialista da X8"
            }
        >
            {!light && (
                <div className="mb-[34px]">
                    <p className="eyebrow mb-3 text-[11px]">Diagnóstico gratuito</p>
                    <h2 className="text-[24px] leading-[1.25] tracking-[-.025em] max-lg:text-[21px] max-md:text-[23px]">
                        Fale com um especialista da X8
                    </h2>
                </div>
            )}
            <div
                className={`grid gap-3 ${light ? "grid-cols-3 gap-x-5 gap-y-[26px] max-lg:grid-cols-2 max-md:grid-cols-1 max-md:gap-5" : ""}`}
            >
                {fields.map((field) => {
                    const id = `${fieldPrefix}-${field.name}`;
                    return (
                        <div key={field.name}>
                            <label
                                className={
                                    light
                                        ? "mb-2 block text-[13px] font-medium"
                                        : "sr-only"
                                }
                                htmlFor={id}
                            >
                                {field.label}
                            </label>
                            <div className="relative">
                                {!light && field.name === "telefone" && (
                                    <svg
                                        className="absolute left-4 top-[19px] h-[14px] w-[19px]"
                                        viewBox="0 0 28 20"
                                        aria-hidden="true"
                                    >
                                        <rect
                                            width="28"
                                            height="20"
                                            rx="2"
                                            fill="#1e9e48"
                                        />
                                        <path
                                            d="m14 2 12 8-12 8L2 10Z"
                                            fill="#f6d21f"
                                        />
                                        <circle
                                            cx="14"
                                            cy="10"
                                            r="4.5"
                                            fill="#1f4aa8"
                                        />
                                    </svg>
                                )}
                                {field.options ? (
                                    <FormSelect
                                        id={id}
                                        name={field.name}
                                        value={data[field.name]}
                                        options={field.options}
                                        placeholder={
                                            light
                                                ? field.name === "faturamento"
                                                    ? "Selecione a faixa de faturamento"
                                                    : "Selecione o seu segmento"
                                                : field.placeholder
                                        }
                                        invalid={Boolean(allErrors[field.name])}
                                        errorId={`${id}-error`}
                                        variant={variant}
                                        onChange={setField}
                                    />
                                ) : (
                                    <input
                                        id={id}
                                        name={field.name}
                                        type={field.type}
                                        autoComplete={field.autoComplete}
                                        value={data[field.name]}
                                        onChange={handleChange}
                                        placeholder={
                                            light && field.name === "telefone"
                                                ? "(00) 00000-0000"
                                                : field.placeholder
                                        }
                                        className={`${inputClass[variant]} ${!light && field.name === "telefone" ? "pl-[45px]" : ""}`}
                                        required
                                        maxLength={
                                            field.name === "telefone" ? 15 : 255
                                        }
                                        aria-invalid={Boolean(
                                            allErrors[field.name],
                                        )}
                                        aria-describedby={
                                            allErrors[field.name]
                                                ? `${id}-error`
                                                : undefined
                                        }
                                    />
                                )}
                            </div>
                            {allErrors[field.name] && (
                                <p
                                    className={`pt-[5px] text-[12px] leading-normal ${light ? "text-[#b42332]" : "text-[#ffc1c1]"}`}
                                    id={`${id}-error`}
                                    role="alert"
                                >
                                    {allErrors[field.name]}
                                </p>
                            )}
                        </div>
                    );
                })}
            </div>
            {unknownErrors.length > 0 && (
                <p className={`pt-[5px] text-[12px] leading-normal ${light ? "text-[#b42332]" : "text-[#ffc1c1]"}`} role="alert">
                    Não foi possível enviar o cadastro. Tente novamente mais
                    tarde.
                </p>
            )}
            {recentlySuccessful && (
                <p role="status">
                    Cadastro enviado com sucesso. Em breve entraremos em
                    contato.
                </p>
            )}
            <div
                className={`mt-7 ${light ? "flex items-center justify-between gap-6 border-t border-[#e1e5ed] pt-6 max-md:flex-col max-md:items-stretch" : ""}`}
            >
                {light && (
                    <div>
                        <label
                            className="flex items-center gap-3 text-[13px] leading-normal text-[#687080]"
                            htmlFor={`${fieldPrefix}-politica`}
                        >
                            <input
                                id={`${fieldPrefix}-politica`}
                                name="politica"
                                type="checkbox"
                                className="size-5 shrink-0 rounded-[5px] text-x8-royal"
                                checked={data.politica}
                                onChange={handleChange}
                                required
                                aria-invalid={Boolean(allErrors.politica)}
                                aria-describedby={
                                    allErrors.politica
                                        ? `${fieldPrefix}-politica-error`
                                        : undefined
                                }
                            />
                            <span>
                                Concordo em receber contato da X8 e com a{" "}
                                <a
                                    className="hover:underline"
                                    href={privacyUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Política de Privacidade.
                                </a>
                            </span>
                        </label>
                        {allErrors.politica && (
                            <p
                                className={`pt-[5px] text-[12px] leading-normal ${light ? "text-[#b42332]" : "text-[#ffc1c1]"}`}
                                id={`${fieldPrefix}-politica-error`}
                                role="alert"
                            >
                                {allErrors.politica}
                            </p>
                        )}
                    </div>
                )}
                <button
                    type="submit"
                    className={`x8-button border-transparent disabled:cursor-wait disabled:opacity-60 ${
                        light
                            ? "w-auto shrink-0 bg-x8-panel px-7 text-white hover:bg-x8-royal max-md:w-full"
                            : "w-full bg-x8-ice text-x8-panel hover:bg-white"
                    }`}
                    disabled={processing}
                >
                    {processing ? "Enviando…" : buttonLabel}
                    <Arrow />
                </button>
            </div>
            {!light && (
                <p className="mt-3 text-center text-[11px] leading-normal text-[#8b9ab4]">
                    Ao enviar, você concorda com a{" "}
                    <a
                        className="hover:underline"
                        href={privacyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Política de Privacidade
                    </a>{" "}
                    da X8.
                </p>
            )}
        </form>
    );
}

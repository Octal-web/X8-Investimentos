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
            className="x8-select"
            classNamePrefix="x8-select"
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
            classNames={{
                control: () => (invalid ? "is-invalid" : ""),
                menuPortal: () =>
                    `x8-select-portal x8-select-portal-${variant}`,
            }}
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
            className={`project-form project-form-${variant}`}
            onSubmit={handleSubmit}
            noValidate
            aria-label={
                light
                    ? "Solicitar diagnóstico"
                    : "Fale com um especialista da X8"
            }
        >
            {!light && (
                <div className="form-heading">
                    <p className="eyebrow">Diagnóstico gratuito</p>
                    <h2>Fale com um especialista da X8</h2>
                </div>
            )}
            <div className="form-fields">
                {fields.map((field) => {
                    const id = `${fieldPrefix}-${field.name}`;
                    return (
                        <div className="form-field" key={field.name}>
                            <label
                                className={light ? "" : "sr-only"}
                                htmlFor={id}
                            >
                                {field.label}
                            </label>
                            <div
                                className={`field-control ${!light && field.name === "telefone" ? "phone-field" : ""}`}
                            >
                                {!light && field.name === "telefone" && (
                                    <svg
                                        className="brazil-flag"
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
                                    className="field-error"
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
                <p className="field-error" role="alert">
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
            <div className="form-bottom">
                {light && (
                    <div>
                        <label
                            className="consent-label"
                            htmlFor={`${fieldPrefix}-politica`}
                        >
                            <input
                                id={`${fieldPrefix}-politica`}
                                name="politica"
                                type="checkbox"
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
                                className="field-error"
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
                    className="x8-button form-submit"
                    disabled={processing}
                >
                    {processing ? "Enviando…" : buttonLabel}
                    <Arrow />
                </button>
            </div>
            {!light && (
                <p className="privacy-note">
                    Ao enviar, você concorda com a{" "}
                    <a
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
